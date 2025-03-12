import { FastifyReply, FastifyRequest } from "fastify";

import bcrypt from "bcrypt";
import { prisma } from "../../../utils/prisma";
import {
  SignInUserInput,
  SignUpUserInput,
} from "../../../schemas/authScemas/AuthSchemas";

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

    //refresh
    const refreshToken = req.server.jwt.sign(
      { id: user.id, email: user.email  },
      { expiresIn: "30d" }
    );

    reply.setCookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    return reply.status(200).send({
      message: "Успешный вход",
      accessToken,
    });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
export const getMe = async (req: FastifyRequest, reply: FastifyReply) => {
  const userId = (req.user as { id: number }).id;
  console.log(userId);
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
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
