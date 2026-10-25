import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';
import { EventController } from '../controllers/EventController';
import { TicketController } from '../controllers/TicketController';
import { AuthController } from '../controllers/AuthController';

export async function routes(fastify: FastifyInstance) {
  
  fastify.post('/api/auth/login', AuthController.login);

  fastify.post('/api/users', UserController.create);
  fastify.get('/api/users/:id', UserController.getById);
  fastify.put('/api/users/:id', UserController.update);

  fastify.post('/api/events', EventController.create);
  fastify.put('/api/events/:id', EventController.update);
  fastify.get('/api/events', EventController.getAll);
  fastify.get('/api/events/:id', EventController.getById);

  fastify.post('/api/tickets/generate', TicketController.generate);
  fastify.post('/api/tickets/purchase', TicketController.purchase);

}