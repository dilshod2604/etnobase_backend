import { prisma } from "./../../../utils/prisma";
import { FastifyReply, FastifyRequest } from "fastify";

export const addSocialMedia = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, link, newsId } = req.body as {
    name: string;
    link: string;
    newsId: number;
  };

  try {
    await prisma.newsSocialmedia.create({
      data: {
        newsId,
        name,
        link,
      },
    });
    reply.status(201).send({ message: "Социальная сеть успешно добавлена" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка добавления социальной сети" });
  }
};

export const deleteSocialMedia = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as {
    id: number;
  };

  try {
    await prisma.newsSocialmedia.delete({
      where: {
        id,
      },
    });
    reply.status(201).send({ message: "Социальная сеть успешно удалена" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка удаления социальной сети" });
  }
};
