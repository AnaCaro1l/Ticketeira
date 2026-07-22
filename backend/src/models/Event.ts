import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Event extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare date: Date;
  declare time: string;
  declare location: string;
  declare imageUrl: string;
  declare tag: string;
  declare ageRating: string;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ageRating: {
      type: DataTypes.STRING,
      defaultValue: 'Livre',
    },
  },
  {
    sequelize,
    tableName: 'events',
    timestamps: true,
  }
);