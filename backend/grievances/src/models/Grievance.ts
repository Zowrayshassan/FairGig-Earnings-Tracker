import { Sequelize, DataTypes, Model } from 'sequelize';
import path from 'path';

const DB_URL = process.env.DATABASE_URL;

const sequelize = DB_URL 
  ? new Sequelize(DB_URL, { 
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: path.join(__dirname, '../../../grievances.sqlite'),
      logging: false
    });

class Grievance extends Model {
  declare id: number;
  declare workerId: string;
  declare workerName: string;
  declare platform: string;
  declare description: string;
  declare status: string;
  declare tags: string; 
  declare evidenceUrl?: string;
  declare readonly createdAt: Date;
}

Grievance.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  workerId: { type: DataTypes.STRING, allowNull: false },
  workerName: { type: DataTypes.STRING, allowNull: false },
  platform: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { 
    type: DataTypes.ENUM('Pending', 'Verified', 'Resolved', 'Escalated'), 
    defaultValue: 'Pending' 
  },
  tags: { type: DataTypes.STRING, defaultValue: '[]' },
  evidenceUrl: { type: DataTypes.STRING, allowNull: true }
}, {
  sequelize,
  modelName: 'Grievance',
  timestamps: false
});

export { sequelize, Grievance };
