import { FastifyRequest, FastifyReply } from 'fastify';
import { Event } from '../models/Event';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { Ticket } from '../models/Ticket';
import { sequelize } from '../config/database';

export const EventController = {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const transaction = await sequelize.transaction();

    try {
      const data = await request.file();

      if (!data) {
        return reply.status(400).send({ message: 'Nenhum arquivo enviado.' });
      }

      const filename = `${Date.now()}-${data.filename.replace(/\s/g, '_')}`;
      const savePath = path.join(__dirname, '../../uploads', filename);
      await pipeline(data.file, fs.createWriteStream(savePath));
      const imageUrl = `http://localhost:3333/uploads/${filename}`;

      const getFieldValue = (field: any) => field ? field.value : null;

      const title = getFieldValue(data.fields.title);
      const description = getFieldValue(data.fields.description);
      const date = getFieldValue(data.fields.date);
      const time = getFieldValue(data.fields.time);
      const location = getFieldValue(data.fields.location);
      const tag = getFieldValue(data.fields.tag);
      const ageRating = getFieldValue(data.fields.ageRating) || '18+';

      const newEvent = await Event.create({
        title, description, date, time, location, tag, ageRating, imageUrl,
      }, { transaction });

      const ticketsRaw = getFieldValue(data.fields.tickets);

      if (ticketsRaw) {
        const ticketsArray = JSON.parse(ticketsRaw);

        const ticketsToCreate = ticketsArray.map((t: any) => ({
          eventId: newEvent.id,
          name: t.name,
          description: t.description,
          price: t.price,
          availableQuantity: t.availableQuantity
        }));

        await Ticket.bulkCreate(ticketsToCreate, { transaction });
      }

      await transaction.commit();
      return reply.status(201).send(newEvent);
    } catch (error) {
      await transaction.rollback();
      console.error('Erro ao criar evento:', error);
      return reply.status(500).send({ message: 'Erro interno ao criar evento.' });
    }
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const events = await Event.findAll({
        include: [{ model: Ticket, as: 'ticketTypes' }]
      });
      return reply.status(200).send(events);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao buscar os eventos' });
    }
  },

  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const event = await Event.findByPk(id, {
        include: [{ model: Ticket, as: 'ticketTypes' }]
      });

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