import { Event } from './Event';
import { User } from './User';
import { Ticket } from './Ticket';

// Um Evento tem vários Ingressos
Event.hasMany(Ticket, { foreignKey: 'eventId' });
Ticket.belongsTo(Event, { foreignKey: 'eventId' });

// Um Usuário tem vários Ingressos
User.hasMany(Ticket, { foreignKey: 'userId' });
Ticket.belongsTo(User, { foreignKey: 'userId' });

export { Event, User, Ticket };