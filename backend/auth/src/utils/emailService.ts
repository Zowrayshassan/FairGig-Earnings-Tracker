import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendResetEmail = async (email: string, resetUrl: string) => {
    const mailOptions = {
        from: `"${process.env.FROM_NAME || 'FairGig Ledger'}" <${process.env.FROM_EMAIL || 'noreply@fairgig.com'}>`,
        to: email,
        subject: '🔒 Access Recovery: FairGig Ethical Ledger',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #00513f;">FairGig Access Recovery</h2>
                <p>You requested a password reset for your FairGig Ethical Ledger account.</p>
                <p>Click the button below to set a new password. This link will expire in 1 hour.</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" style="background-color: #006b54; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                </div>
                <p>If you did not request this, please ignore this email or contact support if you have concerns.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #888;">FairGig Platform • The Ethical Ledger for Gig Workers</p>
            </div>
        `,
    };

    try {
        if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
            console.warn('\n⚠️ [SMTP WARNING] No email credentials found in .env. Falling back to console log simulation.');
            console.log('\n=======================================');
            console.log('📬 PASSWORD RESET EMAIL (SIMULATED)');
            console.log(`To: ${email}`);
            console.log(`Link: ${resetUrl}`);
            console.log('=======================================\n');
            return;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log(`[AUTH] Email sent successfully: ${info.messageId}`);
    } catch (error: any) {
        console.error(`[AUTH ERROR] Failed to send email: ${error.message}`);
        throw new Error('Failed to send reset email');
    }
};
