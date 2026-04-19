import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/User';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || process.env.PORT_AUTH || 5001;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Auth Service: SQL DB Synced (SQLite)');
    app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Auth Service: DB Sync Error:', err);
  });
