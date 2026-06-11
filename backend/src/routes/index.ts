import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';
import { EventController } from '../controllers/EventController';
import { TicketController } from '../controllers/TicketController';
import { AuthController } from '../controllers/AuthController';

export async function routes(fastify: FastifyInstance) {
  
  // ==========================================
  // ROTAS DE AUTENTICAÇÃO
  // ==========================================
  fastify.post('/api/auth/login', AuthController.login);

  // ==========================================
  // ROTAS DE USUÁRIOS
  // ==========================================
  fastify.post('/api/users', UserController.create);
  fastify.get('/api/users/:id', UserController.getById);
  fastify.put('/api/users/:id', UserController.update);

  // ==========================================
  // ROTAS DE EVENTOS
  // ==========================================
  fastify.post('/api/events', EventController.create);
  fastify.get('/api/events', EventController.getAll);
  fastify.get('/api/events/:id', EventController.getById);

  // ==========================================
  // ROTAS DE INGRESSOS
  // ==========================================
  fastify.post('/api/tickets/generate', TicketController.generate);
  fastify.post('/api/tickets/purchase', TicketController.purchase);

}