import { FastifyRequest, FastifyReply } from 'fastify';
import { Event } from '../models';

export const EventController = {
  // Criar um novo evento
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { title, description, date, price, availableTickets } = request.body as any;

      const event = await Event.create({
        title,
        description,
        date,
        price,
        availableTickets,
      });

      return reply.status(201).send(event);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao criar o evento' });
    }
  },

  // Listar todos os eventos
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const events = await Event.findAll();
      return reply.status(200).send(events);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao buscar os eventos' });
    }
  },

  // Buscar um evento específico pelo ID
  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Extrai o ID da URL (ex: /api/events/1)
      const { id } = request.params as { id: string };

      const event = await Event.findByPk(id);

      if (!event) {
        return reply.status(404).send({ error: 'Evento não encontrado' });
      }

      return reply.status(200).send(event);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao buscar o evento' });
    }
  }
};