import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';
import { sequelize } from './config/database'; 
import './models'; 
import { routes } from './routes'; 

const fastify = Fastify({ logger: true });

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

fastify.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
});

fastify.register(fastifyMultipart, {
  limits: { fileSize: 5 * 1024 * 1024 },
});

fastify.register(fastifyStatic, {
  root: uploadsDir,
  prefix: '/uploads/',
});

fastify.get('/api/ping', async (request, reply) => {
  return { status: 'ok', message: 'Ticketeira API rodando!' };
});

fastify.register(routes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o MySQL estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com o banco de dados.');

    await fastify.listen({ port: 3333 });
    console.log('Servidor rodando em http://localhost:3333');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();