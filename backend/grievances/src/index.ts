import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/Grievance';
import grievanceRoutes from './routes/grievanceRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/grievances', grievanceRoutes);

// Route for health checks
app.get('/api/grievances/health', (req, res) => {
  res.json({ status: 'healthy', service: 'grievances' });
});

const PORT = process.env.PORT || process.env.PORT_GRIEVANCES || 5002;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Grievance Service: SQL DB Synced (SQLite)');
    app.listen(PORT, () => console.log(`Grievance Service running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Grievance Service: DB Sync Error:', err);
  });
