import { FastifyRequest, FastifyReply } from 'fastify';
import { Event } from '../models/Event';
import { User } from '../models/User';
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
      const userId = Number(getFieldValue(data.fields.userId));

      if (!userId) {
        return reply.status(400).send({ message: 'Usuário criador obrigatório.' });
      }

      const newEvent = await Event.create({
        userId,
        title,
        description,
        date,
        time,
        location,
        tag,
        ageRating,
        imageUrl,
      }, { transaction });

      const ticketsRaw = getFieldValue(data.fields.tickets);

      if (ticketsRaw) {
        const ticketsArray = JSON.parse(ticketsRaw);

        const ticketsToCreate = ticketsArray.map((t: any) => {
          const quantity = Number(t.availableQuantity ?? t.totalQuantity ?? 0) || 0;

          return {
            eventId: newEvent.id,
            name: t.name,
            description: t.description,
            price: t.price,
            totalQuantity: quantity,
            availableQuantity: quantity,
          };
        });

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

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const event = await Event.findByPk(id);

      if (!event) {
        return reply.status(404).send({ error: 'Evento não encontrado' });
      }

      const body = (request.body && typeof request.body === 'object' ? request.body : {}) as Record<string, any>;
      const fileData = typeof (request as any).file === 'function' ? await (request as any).file() : null;
      const getFieldValue = (field: any) => field ? field.value : null;
      const fields = fileData?.fields ?? {};
      const userId = Number(getFieldValue(fields.userId) ?? body.userId ?? event.userId);

      if (!userId || Number(event.userId) !== Number(userId)) {
        return reply.status(403).send({ message: 'Você não pode editar este evento.' });
      }

      let imageUrl = event.imageUrl;

      if (fileData) {
        const filename = `${Date.now()}-${fileData.filename.replace(/\s/g, '_')}`;
        const savePath = path.join(__dirname, '../../uploads', filename);
        await pipeline(fileData.file, fs.createWriteStream(savePath));
        imageUrl = `http://localhost:3333/uploads/${filename}`;
      }

      const title = getFieldValue(fields.title) ?? body.title ?? event.title;
      const description = getFieldValue(fields.description) ?? body.description ?? event.description;
      const date = getFieldValue(fields.date) ?? body.date ?? event.date;
      const time = getFieldValue(fields.time) ?? body.time ?? event.time;
      const location = getFieldValue(fields.location) ?? body.location ?? event.location;
      const tag = getFieldValue(fields.tag) ?? body.tag ?? event.tag;
      const ageRating = getFieldValue(fields.ageRating) ?? body.ageRating ?? event.ageRating;

      await event.update({
        userId,
        title,
        description,
        date,
        time,
        location,
        tag,
        ageRating,
        imageUrl,
      });

      const ticketsRaw = getFieldValue(fields.tickets) ?? body.tickets;

      if (ticketsRaw) {
        const ticketsArray = typeof ticketsRaw === 'string' ? JSON.parse(ticketsRaw) : ticketsRaw;

        await Ticket.destroy({ where: { eventId: event.id } });

        const ticketsToCreate = ticketsArray.map((t: any) => {
          const quantity = Number(t.availableQuantity ?? t.totalQuantity ?? 0) || 0;

          return {
            eventId: event.id,
            name: t.name,
            description: t.description,
            price: t.price,
            totalQuantity: quantity,
            availableQuantity: quantity,
          };
        });

        await Ticket.bulkCreate(ticketsToCreate);
      }

      return reply.status(200).send(event);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao atualizar o evento' });
    }
  },

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const events = await Event.findAll({
        include: [
          { model: Ticket, as: 'ticketTypes' },
          { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
        ]
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
        include: [
          { model: Ticket, as: 'ticketTypes' },
          { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
        ]
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