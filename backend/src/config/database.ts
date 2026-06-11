import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('ticketeira', 'root', '241701', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});