import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../utils/prisma";

export const addCommentReply = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { commentId, userId, text } = req.body as {
    commentId: number;
    userId: number;
    text: string;
  };
  try {
    await prisma.commentReply.create({
      data: {
        commentId,
        userId,
        text,
      },
    });
    reply.status(201).send({ message: "Комментарий ответа успешно добавлен" });
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка при создании комментария ответа" });
  }
};
export const deleteCommentReply = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { commentId, userId } = req.body as {
    commentId: number;
    userId: number;
  };
  try {
    await prisma.commentReply.delete({
      where: {
        id: commentId,
        userId,
      },
    });
    reply.status(200).send({ message: "Комментарий успешно удален" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении комментария" });
  }
};
export const likeDislikeCommmentReply = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { commentId, userId, reaction } = req.body as {
    commentId: number;
    userId: number;
    reaction: string;
  };

  try {
    const [user, comment] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.commentReply.findUnique({ where: { id: commentId } }),
    ]);
    if (!user || !comment) {
      return reply
        .status(404)
        .send({ message: "Пользователь или комментарий ответа не найдены" });
    }
    const likeExists = await prisma.newsCommentLike.findUnique({
      where: {
        user_reply_unique: {
          userId,
          replyId: commentId,
        },
      },
    });
    const isLike = reaction === "like";
    const isDislike = reaction === "dislike";
    let likesDelta = 0;
    let dislikesDelta = 0;

    if (likeExists) {
      await prisma.newsCommentLike.delete({
        where: {
          user_reply_unique: {
            userId,
            replyId: commentId,
          },
        },
      });
      if (likeExists.isLike) {
        likesDelta -= 1;
      } else {
        dislikesDelta -= 1;
      }
    }
    if (!likeExists || likeExists.isLike !== isLike) {
      await prisma.newsCommentLike.create({
        data: {
          userId,
          replyId: commentId,
          isLike,
          isDislike,
        },
      });
      if (isLike) {
        likesDelta += 1;
      } else {
        dislikesDelta += 1;
      }
    }
    await prisma.commentReply.update({
      where: {
        id: commentId,
      },
      data: {
        likes: { increment: likesDelta },
        dislikes: { increment: dislikesDelta },
      },
    });
    reply.status(204).send();
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка при лайк/дизлайк комментария ответа" });
  }
};
export const fetchCommentReply = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { commentId, userId } = req.params as {
    commentId: number;
    userId: number;
  };
  try {
    const commentReply = await prisma.newsComment.findMany({
      where: {
        id: commentId,
      },
      include: {
        replies: {
          include: {
            newsReplyLikes: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    reply.status(200).send(commentReply);
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка при получении всех комментариев ответов" });
  }
};
