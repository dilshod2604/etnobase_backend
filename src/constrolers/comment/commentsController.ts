import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";

export const addComment = async (req: FastifyRequest, reply: FastifyReply) => {
  const { newsId, text, userId } = req.body as {
    newsId: number;
    text: string;
    userId: number;
  };
  try {
    await prisma.newsComment.create({
      data: {
        newsId,
        text,
        userId,
      },
    });
    reply.status(201).send({ message: "Коментария успешно добавлено" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при добавлении коментария" });
  }
};
export const likeComment = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id, reaction, userId } = req.params as {
    id: number;
    reaction: string;
    userId: number;
  };
  console.log(id, reaction, userId);
  const isLike = reaction === "like";
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      return reply.status(404).send({ message: "Пользователь не найден" });
    }

    const existLike = await prisma.newsCommentLike.findUnique({
      where: {
        userId_commentId: {
          commentId: id,
          userId,
        },
      },
    });

    if (existLike && existLike.isLike === isLike) {
      return reply.badRequest("Вы уже лайкнули");
    }

    await prisma.newsCommentLike.upsert({
      where: {
        userId_commentId: {
          userId,
          commentId: id,
        },
      },
      update: {
        isLike,
      },
      create: {
        userId,
        commentId: id,
        isLike,
      },
    });
    if (existLike) {
      if (isLike) {
        await prisma.$executeRaw`UPDATE comments SET dislikes = dislikes - 1, likes = likes + 1  WHERE id = ${id}`;
      } else {
        await prisma.$executeRaw`UPDATE comments SET dislikes = dislikes + 1, likes = likes - 1  WHERE id = ${id}`;
      }
    } else {
      if (isLike) {
        await prisma.$executeRaw`UPDATE comments SET likes = likes + 1  WHERE id = ${id}`;
      } else {
        await prisma.$executeRaw`UPDATE comments SET dislikes = dislikes + 1 WHERE id = ${id}`;
      }
    }
    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при лайки коментария" });
  }
};

export const disLikeComments = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id, reaction, userId } = req.params as {
    id: number;
    reaction: string;
    userId: number;
  };
  const isDislike = reaction === "dislike";
  try {
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      return reply.status(404).send({ message: "Пользователь не найден" });
    }
    await prisma.newsCommentLike
      .delete({
        where: { userId_commentId: { userId, commentId: id } },
      })
      .then(async () => {
        let result = null;
        if (isDislike) {
          result =
            await prisma.$executeRaw`UPDATE comments SET dislikes = dislikes - 1 WHERE id = ${id}`;
        } else {
          result =
            await prisma.$executeRaw`UPDATE comments SET likes = likes - 1 WHERE id = ${id}`;
        }
        return reply.status(result > 0 ? 200 : 404).send();
      });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при дизлайки коментария" });
  }
};
export const fetchAllComments = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const comments = await prisma.newsComment.findMany({
      include: {
        user: {
          select: {
            id: true,
            avatar: true,
            email: true,
            name: true,
          },
        },
      },
    });
    reply.status(200).send(comments);
  } catch (error) {
    console.error(error);
  }
};
export const fetchNewsComments = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { newsId } = req.params as { newsId: number };
  try {
    const comments = await prisma.newsComment.findMany({
      where: {
        newsId,
      },
      include: {
        user: {
          select: {
            id: true,
            avatar: true,
            email: true,
            name: true,
          },
        },
      },
    });
    reply.status(200).send(comments);
  } catch (error) {
    console.error(error);
  }
};
export const deleteComment = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id, userId } = req.params as { id: number; userId: number };
  try {
    await prisma.newsComment.delete({
      where: {
        id,
        userId,
      },
    });
    reply.status(204).send({ message: "Коментария успешно удалено" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении коментария" });
  }
};
