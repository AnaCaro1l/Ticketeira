import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/User'; 

export const AuthController = {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any;

    try {
      if (!email || !password) {
        return reply.status(400).send({ message: 'E-mail e senha são obrigatórios.' });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return reply.status(401).send({ message: 'E-mail ou senha inválidos.' });
      }

      const isPasswordValid = password === user.passwordHash;

      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'E-mail ou senha inválidos.' });
      }

      return reply.status(200).send({
        user: {
          id: user.id,
          name: user.name, 
          email: user.email
        },
        token: `auth-token-${user.id}-${Date.now()}`
      });

    } catch (error) {
      console.error('Erro no login:', error);
      return reply.status(500).send({ message: 'Erro interno no servidor.' });
    }
  }
};