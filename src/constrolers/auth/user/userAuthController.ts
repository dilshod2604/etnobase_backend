import { FastifyReply, FastifyRequest } from "fastify";

import bcrypt from "bcrypt";
import { prisma } from "../../../utils/prisma";
import {
  ForgotPasswordInput,
  ResetPasswordInput,
  SignInUserInput,
  SignUpUserInput,
  VerifyResetCodeInput,
} from "../../../schemas/authScemas/AuthSchemas";
import { sendEmail } from "../../../utils/sendMail/sendEmail";

export const signUp = async (
  req: FastifyRequest<{ Body: SignUpUserInput }>,
  reply: FastifyReply
) => {
  try {
    const { email, name, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return reply
        .status(400)
        .send({ message: "Пользователь с таким email уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        provider: true,
      },
    });
    reply
      .status(201)
      .send({ message: "Пользователь успешно зарегистрировался", data: user });
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка регисрации пользователя", error });
  }
};
export const signIn = async (
  req: FastifyRequest<{ Body: SignInUserInput }>,
  reply: FastifyReply
) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return reply
        .status(404)
        .send({ message: "Пользователь не найден с таким email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return reply.status(400).send({ message: "Неверный пароль" });
    }

    //accessToken
    const accessToken = req.server.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: "5m" }
    );

    // refresh
    const refreshToken = req.server.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: "30d" }
    );
    return reply.status(200).send({
      message: "Успешный вход",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return reply.status(500).send({ message: "Внутрення ошибка сервера" });
  }
};
export const getMe = async (req: FastifyRequest, reply: FastifyReply) => {
  const userId = (req.user as { id: number }).id;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        provider: true,
        avatar: true,
      },
    });
    if (!user) {
      return reply.status(404).send({ message: "Пользователь не найден" });
    }
    reply.status(200).send(user);
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка получения информации о пользователе" });
  }
};
export const editMe = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id, email, name } = req.body as {
    id: number;
    email: string;
    name: string;
  };
  try {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        name,
      },
    });
    if (!updateUser) {
      return reply.status(404).send({ message: "Пользователь не найден" });
    }
    reply.status(200).send({ message: "Пользователь успешно изменен" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при пользователе" });
  }
};
export const forgotPassword = async (
  req: FastifyRequest<{ Body: ForgotPasswordInput }>,
  reply: FastifyReply
) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return reply.status(404).send({ message: "Пользователь не найден" });
  }

  const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.passwordResetCode.upsert({
    where: { email },
    update: { code: resetCode, expiresAt },
    create: { email, code: resetCode, expiresAt },
  });
  const result = await sendEmail({
    to: email,
    message: resetCode,
  });

  return reply.send({ message: result });
};
export const verifyResetCode = async (
  req: FastifyRequest<{ Body: VerifyResetCodeInput }>,
  reply: FastifyReply
) => {
  const { code } = req.body as { code: string };

  const resetEntry = await prisma.passwordResetCode.findFirst({
    where: { code, expiresAt: { gt: new Date() } },
  });

  if (!resetEntry) {
    return reply.status(400).send({ message: "Неверный или просроченный код" });
  }

  return reply.send({ message: "Код подтверждён" });
};
export const resetPassword = async (
  req: FastifyRequest<{ Body: ResetPasswordInput }>,
  reply: FastifyReply
) => {
  const { email, newPassword } = req.body as {
    email: string;
    newPassword: string;
  };

  const resetEntry = await prisma.passwordResetCode.findFirst({
    where: { email, expiresAt: { gt: new Date() } },
  });

  if (!resetEntry) {
    return reply.status(400).send({ message: "Неверный или просроченный код" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email: resetEntry.email },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetCode.delete({ where: { email: resetEntry.email } });

  return reply.send({ message: "Пароль успешно изменён" });
};
