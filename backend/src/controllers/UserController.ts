import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models';

export const UserController = {
  // Criar um novo usuário
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, passwordHash } = request.body as any;

      // Nota: Em um projeto real, faríamos o hash da senha aqui usando bibliotecas como bcrypt
      const user = await User.create({
        name,
        email,
        passwordHash,
      });

      return reply.status(201).send(user);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao criar o usuário' });
    }
  },

  // Buscar usuário por ID (útil para a tela de Perfil)
  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await User.findByPk(id);

      if (!user) {
        return reply.status(404).send({ error: 'Usuário não encontrado' });
      }

      return reply.status(200).send(user);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao buscar o usuário' });
    }
  },
  
  // Atualizar dados de um usuário
  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { name, email } = request.body as { name?: string; email?: string };

      const user = await User.findByPk(id);

      if (!user) {
        return reply.status(404).send({ error: 'Usuário não encontrado' });
      }

      // O Sequelize é inteligente: ele só vai atualizar no banco os campos 
      // que você realmente enviou no corpo da requisição.
      await user.update({
        name: name !== undefined ? name : user.getDataValue('name'),
        email: email !== undefined ? email : user.getDataValue('email'),
      });

      return reply.status(200).send({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: 'Erro ao atualizar o usuário' });
    }
  }
};