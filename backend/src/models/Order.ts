import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Order extends Model {
  declare id: number;
  declare userId: number;
  declare totalAmount: number;
  declare status: 'PENDING' | 'APPROVED' | 'CANCELLED';
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'CANCELLED'),
      defaultValue: 'PENDING',
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  }
);