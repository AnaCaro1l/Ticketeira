import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/User'; 

export const AuthController = {
  async login(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any;

    try {
      if (!email || !password) {
        return reply.status(400).send({ message: 'E-mail e senha são obrigatórios.' });
      }

      // 1. Busca o usuário pelo e-mail
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return reply.status(401).send({ message: 'E-mail ou senha inválidos.' });
      }

      // 2. Validação da Senha
      // Atenção ao nome do campo: user.passwordHash (veio do seu model!)
      
      // OPÇÃO A: Se você ainda está salvando a senha em texto puro para testar:
      const isPasswordValid = password === user.passwordHash;

      // OPÇÃO B: Quando for usar bcrypt (Recomendado para produção):
      // const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: 'E-mail ou senha inválidos.' });
      }

      // 3. Retorna os dados com sucesso
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