import { FastifyRequest, FastifyReply } from 'fastify';
import { sequelize } from '../config/database';
import { Ticket } from '../models/Ticket';
import { Order } from '../models/Order';
import { UserTicket } from '../models/UserTicket';

interface CheckoutItem {
  ticketId: number;
  quantity: number;
}

export const CheckoutController = {
  async createOrder(request: FastifyRequest, reply: FastifyReply) {
    const userId = (request as any).user.id; 
    const { items } = request.body as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return reply.status(400).send({ message: 'O carrinho está vazio.' });
    }

    const transaction = await sequelize.transaction();

    try {
      let totalAmount = 0;
      const ticketsToCreate: any[] = [];

      for (const item of items) {
        const ticketType = await Ticket.findByPk(item.ticketId, { transaction });

        if (!ticketType) {
          await transaction.rollback();
          return reply.status(404).send({ message: `Ingresso ID ${item.ticketId} não encontrado.` });
        }

        if (ticketType.availableQuantity < item.quantity) {
          await transaction.rollback();
          return reply.status(400).send({ 
            message: `Estoque insuficiente para o ingresso "${ticketType.name}". Disponível: ${ticketType.availableQuantity}` 
          });
        }

        ticketType.availableQuantity -= item.quantity;
        if (ticketType.availableQuantity < 0) {
          ticketType.availableQuantity = 0;
        }
        await ticketType.save({ transaction });

        totalAmount += Number(ticketType.price) * item.quantity;

        for (let i = 0; i < item.quantity; i++) {
          ticketsToCreate.push({
            ticketId: ticketType.id,
            eventId: ticketType.eventId,
            userId: userId
          });
        }
      }

      const order = await Order.create({
        userId,
        totalAmount,
        status: 'APPROVED' 
      }, { transaction });

      const finalUserTickets = ticketsToCreate.map(ticket => ({
        ...ticket,
        orderId: order.id
      }));

      await UserTicket.bulkCreate(finalUserTickets, { transaction });

      await transaction.commit();

      return reply.status(201).send({
        message: 'Compra realizada com sucesso!',
        orderId: order.id,
        total: totalAmount
      });

    } catch (error) {
      await transaction.rollback();
      console.error('Erro na transação de checkout:', error);
      return reply.status(500).send({ message: 'Erro interno ao processar a compra.' });
    }
  }
};