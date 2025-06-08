import { HttpError } from '../errors/httpError';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import nodemailer from 'nodemailer';

export const authMiddleware = async (
  request: FastifyRequest,
  _reply: FastifyReply
) => {
  const token = request.cookies.token;
  if (!token) throw new HttpError(401, 'Authentication token missing');

  const payload = await request.jwtVerify<{ id: string }>();
  request.user = { id: payload.id };
};

export const sendEmailVerification = async (
  app: FastifyInstance,
  email: string,
  link: string
) => {
  const { SMTP_USER, SMTP_PASSWORD } = app.config;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: SMTP_USER,
    to: email,
    replyTo: SMTP_USER,
    subject: 'Confirm your email',
    text: `Click the link to confirm your email.`,
    // O ideal seria enviar o link para a página de Login e então dar um GET na rota de confirmação de Email.
    // Mas por enquanto, vamos enviar o link direto para a confirmação.
    html: `<p>Click the link to confirm your email: <a href="${link}">Link para Confirmar o Email</a></p>`
  });
};
