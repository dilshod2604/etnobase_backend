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
export const handleLikeDislike = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id, reaction, userId } = req.body as {
    id: number;
    reaction: string;
    userId: number;
  };

  try {
    const [user, comment] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.newsComment.findUnique({ where: { id } }),
    ]);

    if (!user || !comment) {
      return reply.status(404).send({ message: "Пользователь или комментарий не найден" });
    }

    const isLike = reaction === "like";
    const isDislike = reaction === "dislike";

    if (!isLike && !isDislike) {
      return reply.badRequest("Некорректная реакция");
    }

    const existReaction = await prisma.newsCommentLike.findUnique({
      where: { userId_commentId: { userId, commentId: id } },
    });

    await prisma.$transaction(async (tx) => {
      if (existReaction) {
        await tx.newsCommentLike.delete({
          where: { userId_commentId: { userId, commentId: id } },
        });

        await tx.newsComment.update({
          where: { id },
          data: {
            likes: { decrement: existReaction.isLike ? 1 : 0 },
            dislikes: { decrement: existReaction.isLike ? 0 : 1 },
          },
        });

        if (existReaction.isLike !== isLike) {
          await tx.newsCommentLike.create({
            data: { userId, commentId: id, isLike },
          });

          await tx.newsComment.update({
            where: { id },
            data: {
              likes: { increment: isLike ? 1 : 0 },
              dislikes: { increment: isLike ? 0 : 1 },
            },
          });
        }
      } else {
        await tx.newsCommentLike.create({
          data: { userId, commentId: id, isLike },
        });

        await tx.newsComment.update({
          where: { id },
          data: {
            likes: { increment: isLike ? 1 : 0 },
            dislikes: { increment: isLike ? 0 : 1 },
          },
        });
      }
    });

    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обработке реакции" });
  }
};
export const fetchAllComments = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const comments = await prisma.newsComment.findMany({
      include: {
        newsCommentLike: {
          select: {
            isLike: true,
          },
        },
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
    if (comments.length === 0) {
      return reply.status(404).send({ message: "Коментарии не найдены" });
    }
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
