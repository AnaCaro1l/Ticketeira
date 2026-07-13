import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class UserTicket extends Model {
  declare id: number;
  declare orderId: number;
  declare ticketId: number;
  declare eventId: number;
  declare userId: number;
  declare qrCode: string;
  declare status: 'AVAILABLE' | 'USED';
}

UserTicket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qrCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => uuidv4(),
    },
    status: {
      type: DataTypes.ENUM('AVAILABLE', 'USED'),
      defaultValue: 'AVAILABLE',
    },
  },
  {
    sequelize,
    tableName: 'user_tickets',
    timestamps: true,
  }
);