import Fastify from 'fastify';
import cors from '@fastify/cors'; // <-- 1. Importa o plugin de CORS
import { sequelize } from './config/database'; 
import './models'; 
import { routes } from './routes'; 

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
});

fastify.get('/api/ping', async (request, reply) => {
  return { status: 'ok', message: 'Ticketeira API rodando!' };
});

fastify.register(routes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o MySQL estabelecida com sucesso.');

    await fastify.listen({ port: 3333 });
    console.log('Servidor rodando em http://localhost:3333');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();