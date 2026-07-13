import { User } from './User';
import { Event } from './Event';
import { Ticket } from './Ticket';
import { Order } from './Order';
import { UserTicket } from './UserTicket';

// Relacionamentos do Pedido (Order)
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(UserTicket, { foreignKey: 'orderId' });
UserTicket.belongsTo(Order, { foreignKey: 'orderId' });

// Relacionamentos do Ingresso Real (UserTicket)
User.hasMany(UserTicket, { foreignKey: 'userId' });
UserTicket.belongsTo(User, { foreignKey: 'userId' });

Ticket.hasMany(UserTicket, { foreignKey: 'ticketId' });
UserTicket.belongsTo(Ticket, { foreignKey: 'ticketId' });

Event.hasMany(UserTicket, { foreignKey: 'eventId' });
UserTicket.belongsTo(Event, { foreignKey: 'eventId' });

export { User, Event, Ticket, Order, UserTicket };