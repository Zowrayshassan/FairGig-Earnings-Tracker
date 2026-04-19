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
      storage: path.join(__dirname, '../../../auth.sqlite'),
      logging: false
    });

export type UserRole = 'Worker' | 'Verifier' | 'Advocate';

class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: UserRole;
  declare resetToken: string | null;
  declare resetExpires: Date | null;
  declare readonly createdAt: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM('Worker', 'Verifier', 'Advocate'), 
    defaultValue: 'Worker',
    allowNull: false 
  },
  resetToken: { type: DataTypes.STRING, allowNull: true },
  resetExpires: { type: DataTypes.DATE, allowNull: true }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
});

class RefreshToken extends Model {
  declare id: number;
  declare userId: number;
  declare token: string;
  declare expiryDate: Date;
}

RefreshToken.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  token: { type: DataTypes.STRING, allowNull: false },
  expiryDate: { type: DataTypes.DATE, allowNull: false }
}, {
  sequelize,
  modelName: 'RefreshToken',
  timestamps: false
});

export { sequelize, User, RefreshToken };
