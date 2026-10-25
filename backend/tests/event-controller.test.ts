import test from 'node:test';
import assert from 'node:assert/strict';

import { EventController } from '../src/controllers/EventController';
import { Event } from '../src/models/Event';

test('update rejects when the user is not the event creator', async () => {
  const originalFindByPk = Event.findByPk;
  Event.findByPk = async () => ({
    id: 10,
    userId: 1,
    title: 'Evento de teste',
    save: async () => undefined,
  }) as any;

  const request = {
    params: { id: '10' },
    body: { userId: 2, title: 'Evento alterado' },
    file: async () => null,
  } as any;

  const reply = {
    status(code: number) {
      this.code = code;
      return this;
    },
    send(payload: any) {
      this.payload = payload;
      return this;
    },
  } as any;

  await EventController.update(request, reply);

  assert.equal(reply.code, 403);
  assert.match(reply.payload.message, /não pode editar/i);

  Event.findByPk = originalFindByPk;
});
