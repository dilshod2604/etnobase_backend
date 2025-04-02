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
      return reply
        .status(404)
        .send({ message: "Пользователь или комментарий не найден" });
    }

    await prisma.$transaction(async (tx) => {
      const isLike = reaction === "like";
      const isDislike = reaction === "dislike";
      const existReaction = await tx.newsCommentLike.findUnique({
        where: { user_comment_unique: { userId, commentId: id } },
      });

      let likesDelta = 0;
      let dislikesDelta = 0;

      if (existReaction) {
        await tx.newsCommentLike.delete({
          where: { user_comment_unique: { userId, commentId: id } },
        });

        if (existReaction.isLike) {
          likesDelta -= 1;
        } else {
          dislikesDelta -= 1;
        }
      }

      if (!existReaction || existReaction.isLike !== isLike) {
        await tx.newsCommentLike.create({
          data: { userId, commentId: id, isLike, isDislike },
        });

        if (isLike) {
          likesDelta += 1;
        } else {
          dislikesDelta += 1;
        }
      }

      await tx.newsComment.update({
        where: { id },
        data: {
          likes: { increment: likesDelta },
          dislikes: { increment: dislikesDelta },
        },
      });
    });

    return reply.status(204).send();
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Ошибка при обработке реакции" });
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
            isDislike: true,
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
        newsCommentLike: true,
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
