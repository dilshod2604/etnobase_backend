import { FastifyReply, FastifyRequest } from "fastify";
import {
  DeleteALLFavoritesInput,
  UserFavoritesInput,
} from "../../../schemas/user/favorites/userFavoritesSchema";
import { prisma } from "../../../utils/prisma";

export const addFavorites = async (
  req: FastifyRequest<{ Body: UserFavoritesInput }>,
  reply: FastifyReply
) => {
  const { userId, personId } = req.body;
  try {
    const existingFavorites = await prisma.favorites.findFirst({
      where: { personId, userId },
    });

    if (existingFavorites) {
      return reply.status(400).send({
        message: "Такой персонаж  уже есть в избранном",
      });
    }

    await prisma.favorites.create({
      data: { personId, userId, isFavorite: true },
    });

    return reply.status(201).send({ message: "Добавлено в избранное" });
  } catch (error) {
    console.error("Ошибка при добавлении в избранное:", error);
    return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
export const removeFavorites = async (
  req: FastifyRequest<{ Body: UserFavoritesInput }>,
  reply: FastifyReply
) => {
  const { userId, personId } = req.body;
  try {
    const existingFavorites = await prisma.favorites.findFirst({
      where: { personId, userId },
    });

    if (!existingFavorites) {
      return reply.status(404).send({
        message: "Такой персонаж не найдена в избранном",
      });
    }

    await prisma.favorites.delete({
      where: { userId_personId: { personId, userId } },
    });

    return reply.status(200).send({ message: "Удалено из избранного" });
  } catch (error) {
    console.error("Ошибка при удалении из избранного:", error);
    return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
export const removeAllFavorites = async (
  req: FastifyRequest<{ Body: DeleteALLFavoritesInput }>,
  reply: FastifyReply
) => {
  const { userId } = req.body;

  try {
    const existingFavorites = await prisma.favorites.findFirst({
      where: { userId },
    });

    if (!existingFavorites) {
      return reply.status(404).send({
        message: "У пользователя нет избранного",
      });
    }

    await prisma.favorites.deleteMany({
      where: { userId },
    });

    return reply.status(200).send({ message: "Все избранные удалены" });
  } catch (error) {
    console.error("Ошибка при удалении избранного:", error);
    return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
export const getFavorites = async (
  req: FastifyRequest<{ Querystring: { userId: number } }>,
  reply: FastifyReply
) => {
  const { userId } = req.query;

  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      return reply.status(404).send({ message: "Пользователь не найден" });
    }

    const favorites = await prisma.favorites.findMany({
      where: { userId },
      include: {
        person: {
          include: {
            roles: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });
    return reply.status(200).send(favorites);
  } catch (error) {
    console.error("Ошибка при получении избранного:", error);
    return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
export const checkFavorite = async (
  req: FastifyRequest<{ Querystring: UserFavoritesInput }>,
  reply: FastifyReply
) => {
  const { userId, personId } = req.query;
  try {
    if (!userId || !personId) {
      return reply
        .status(400)
        .send({ message: "Необходимы userId и personId" });
    }
    const favorite = await prisma.favorites.findFirst({
      where: { personId, userId },
    });
    if (!favorite) {
      return reply.status(200).send({ isFavorite: false });
    }
    reply.status(200).send({ isFavorite: true });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при проверке избранности" });
  }
};
