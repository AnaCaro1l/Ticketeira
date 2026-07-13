import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Event } from './Event';

export class Ticket extends Model {
  declare id: number;
  declare eventId: number;
  declare name: string;
  declare description: string;
  declare price: number;
  declare availableQuantity: number;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    availableQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tickets',
    timestamps: true,
  }
);

Event.hasMany(Ticket, { foreignKey: 'eventId', as: 'ticketTypes' });
Ticket.belongsTo(Event, { foreignKey: 'eventId' });