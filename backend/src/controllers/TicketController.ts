import { FastifyRequest, FastifyReply } from 'fastify';
import { Ticket, Event } from '../models';

export const TicketController = {
  async generate(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { eventId, quantity } = request.body as { eventId: number; quantity: number };

      const event = await Event.findByPk(eventId);
      if (!event) {
        return reply.status(404).send({ error: 'Evento não encontrado' });
      }

      const ticketsToCreate = Array.from({ length: quantity }).map(() => ({
        eventId,
        status: 'available',
      }));

      await Ticket.bulkCreate(ticketsToCreate);

      return reply.status(201).send({ message: `${quantity} ingressos gerados com sucesso para o evento!` });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao gerar os ingressos' });
    }
  },

  async purchase(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { eventId, userId } = request.body as { eventId: number; userId: number };

      const ticket = await Ticket.findOne({
        where: {
          eventId,
          status: 'available',
        },
      });

      if (!ticket) {
        return reply.status(400).send({ error: 'Ingressos esgotados para este evento!' });
      }

      await ticket.update({
        userId,
        status: 'sold',
      });

      return reply.status(200).send({ message: 'Compra realizada com sucesso!', ticket });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao processar a compra' });
    }
  }
};