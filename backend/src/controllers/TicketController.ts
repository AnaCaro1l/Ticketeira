import { FastifyRequest, FastifyReply } from 'fastify';
import { Ticket, Event } from '../models';

export const TicketController = {
  // Gerar ingressos em lote para um evento
  async generate(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { eventId, quantity } = request.body as { eventId: number; quantity: number };

      const event = await Event.findByPk(eventId);
      if (!event) {
        return reply.status(404).send({ error: 'Evento não encontrado' });
      }

      // Cria um array com os ingressos disponíveis
      const ticketsToCreate = Array.from({ length: quantity }).map(() => ({
        eventId,
        status: 'available',
      }));

      // bulkCreate insere todos no banco de uma só vez (muito mais performático)
      await Ticket.bulkCreate(ticketsToCreate);

      return reply.status(201).send({ message: `${quantity} ingressos gerados com sucesso para o evento!` });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao gerar os ingressos' });
    }
  },

  // Processar a compra de um ingresso
  async purchase(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { eventId, userId } = request.body as { eventId: number; userId: number };

      // 1. Busca o primeiro ingresso disponível para este evento
      const ticket = await Ticket.findOne({
        where: {
          eventId,
          status: 'available',
        },
      });

      if (!ticket) {
        return reply.status(400).send({ error: 'Ingressos esgotados para este evento!' });
      }

      // 2. Vincula o ingresso ao usuário e muda o status
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