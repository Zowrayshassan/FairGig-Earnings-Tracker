import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, RefreshToken } from '../models/User';
import crypto from 'crypto';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sendResetEmail } from '../utils/emailService';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fairgig_secret_key_2026';
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days

const generateRefreshToken = async (userId: number) => {
    const token = uuidv4();
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + REFRESH_TOKEN_EXPIRY);

    await RefreshToken.create({
        userId,
        token,
        expiryDate
    });

    return token;
};

// @route   POST api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    console.log(`[AUTH] Registration attempt: ${email}`);
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const payload = { user: { id: newUser.id, role: newUser.role } };

    const refreshToken = await generateRefreshToken(newUser.id);

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, refreshToken, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
    });
  } catch (err: any) {
    console.error(`[AUTH ERROR] Registration failed: ${err.message}`);
    res.status(500).json({ msg: 'Registration failed', error: err.message });
  }
});

// @route   POST api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log(`[AUTH] Login attempt for: ${email}`);
    let user = await User.findOne({ where: { email } });
    
    if (!user) {
      console.warn(`[AUTH] Login failed: User not found (${email})`);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    console.log(`[AUTH] Comparing password for: ${email}`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`[AUTH] Login failed: Password mismatch for ${email}`);
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const refreshToken = await generateRefreshToken(user.id);

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error(`[AUTH ERROR] JWT signing failed: ${err.message}`);
        throw err;
      }
      res.json({ token, refreshToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  } catch (err: any) {
    console.error(`[AUTH ERROR] Login 500: ${err.message}`);
    res.status(500).json({ msg: 'Internal Server Error', detail: err.message });
  }
});

// @route   POST api/auth/refresh
router.post('/refresh', async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ msg: 'Refresh Token required' });

    try {
        const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
        if (!storedToken) return res.status(403).json({ msg: 'Invalid Refresh Token' });

        if (new Date(storedToken.expiryDate) < new Date()) {
            await RefreshToken.destroy({ where: { id: storedToken.id } });
            return res.status(403).json({ msg: 'Refresh Token expired' });
        }

        const user = await User.findByPk(storedToken.userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const payload = { user: { id: user.id, role: user.role } };
        const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token: newAccessToken });
    } catch (err: any) {
        console.error(`[AUTH ERROR] Token Refresh: ${err.message}`);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/logout
router.post('/logout', async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
        await RefreshToken.destroy({ where: { token: refreshToken } });
        res.json({ msg: 'Logged out successfully' });
    } catch (err: any) {
        res.status(500).send('Server Error');
    }
});


// @route   POST api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ msg: 'User with this email does not exist' });
        }

        // Generate reset token
        const token = crypto.randomBytes(20).toString('hex');
        user.resetToken = token;
        user.resetExpires = new Date(Date.now() + 3600000); // 1 hour

        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${token}`;
        
        // Send real email
        await sendResetEmail(email, resetUrl);

        res.json({ msg: 'Password reset link sent to your email.' });
    } catch (err: any) {
        console.error(`[AUTH ERROR] Forgot Password: ${err.message}`);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/auth/users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role']
        });
        res.json(users);
    } catch (err: any) {
        res.status(500).send('Server Error');
    }
});

// @route   GET api/auth/health
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'healthy', service: 'auth' });
});

// @route   POST api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response) => {
    const { token, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetExpires: { [Op.gt]: new Date() }
            }
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired reset token' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetToken = null;
        user.resetExpires = null;

        await user.save();

        res.json({ msg: 'Password reset successful. You can now log in.' });
    } catch (err: any) {
        console.error(`[AUTH ERROR] Reset Password: ${err.message}`);
        res.status(500).send('Server Error');
    }
});

export default router;
