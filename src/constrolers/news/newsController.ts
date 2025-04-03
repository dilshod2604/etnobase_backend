import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateNewsInput,
  UpdateNewsInput,
} from "../../schemas/news/newsSchema";
import { prisma } from "../../utils/prisma";

export const createNews = async (
  req: FastifyRequest<{ Body: CreateNewsInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const news = await prisma.news.create({
      data,
    });
    reply.status(201).send(news);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка создания новости" });
  }
};
export const updateNews = async (
  req: FastifyRequest<{
    Body: UpdateNewsInput;
    Params: { id: string };
  }>,
  reply: FastifyReply
) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const news = await prisma.news.update({
      where: { id: parseInt(id) },
      data,
    });
    if (!news) {
      reply.status(404).send({ message: "Новость не найдена" });
    }
    reply.status(200).send({ message: "Новости успешно обновлено" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка обновлении новости" });
  }
};
export const deleteNews = async (
  req: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    const news = await prisma.news.delete({
      where: { id: parseInt(id) },
    });
    if (!news) {
      reply.status(404).send({ message: "Новость не найдена" });
    }
    reply.status(200).send({ message: "Новости успешно удалено" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка удалении новости" });
  }
};
export const fetchNews = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const news = await prisma.news.findMany({
      include: {
        comments: true,
        newsLikes: true,
        newsViews: true,
      },
    });
    reply.status(200).send(news);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при получение новостей" });
  }
};
export const fetchNewsById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  47;
  const { id } = req.params;
  try {
    const news = await prisma.news.findFirst({
      where: { id: parseInt(id) },
    });
    if (!news) {
      reply.status(404).send({ message: "Новость не найдена" });
    }
    reply.status(200).send(news);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при получение новостей" });
  }
};
export const handleLikeDislikeNews = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId, newsId, reaction } = req.body as {
    userId: number;
    newsId: number;
    reaction: string;
  };
  try {
    const [user, news] = await Promise.all([
      prisma.user.findFirst({ where: { id: userId } }),
      prisma.news.findFirst({ where: { id: newsId } }),
    ]);
    if (!user || !news) {
      return reply
        .status(404)
        .send({ message: "Пользователь или новость не найдены" });
    }

    await prisma.$transaction(async (tx) => {
      const isLike = reaction === "like";
      const isDislike = reaction === "dislike";
      const existingNewsLike = await prisma.newsLikes.findUnique({
        where: {
          userId_newsId: {
            userId,
            newsId,
          },
        },
      });
      let likesDelta = 0;
      let dislikesDelta = 0;

      if (existingNewsLike) {
        await tx.newsLikes.delete({
          where: {
            userId_newsId: {
              userId,
              newsId,
            },
          },
        });

        if (existingNewsLike.isLike) {
          likesDelta -= 1;
        } else {
          dislikesDelta -= 1;
        }
      }
      if (!existingNewsLike || existingNewsLike.isLike !== isLike) {
        await tx.newsLikes.create({
          data: {
            userId,
            newsId,
            isLike,
            isDislike,
          },
        });
        if (isLike) {
          likesDelta += 1;
        } else if (isDislike) {
          dislikesDelta += 1;
        }
      }
      await tx.news.update({
        where: {
          id: newsId,
        },
        data: {
          likes: { increment: likesDelta },
          dislikes: { increment: dislikesDelta },
        },
        // select: {
        //   id: true,
        //   likes: true,
        //   dislikes: true,
        // },
      });
      return reply.status(204).send();
    });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при лайк/дизлайк новости" });
  }
};
export const newsViews = async (req: FastifyRequest, reply: FastifyReply) => {
  const { newsId, userId } = req.body as { userId: number; newsId: number };

  try {
    const [userExists, newsExists] = await Promise.all([
      prisma.user.count({ where: { id: userId } }),
      prisma.news.count({ where: { id: newsId } }),
    ]);

    if (!userExists || !newsExists) {
      return reply.status(404).send({
        message: "Пользователь или новость не найдены",
      });
    }

    await prisma.$transaction(async (tx) => {
      await tx.newsViews.upsert({
        where: { userId_newsId: { userId, newsId } },
        create: {
          userId,
          newsId,
          views: 1,
        },
        update: {
          views: { increment: 1 },
        },
      });

      await tx.news.update({
        where: { id: newsId },
        data: { views: { increment: 1 } },
      });
    });

    return reply.status(204).send();
  } catch (error) {
    console.error("News view tracking error:", error);
    return reply.status(500).send({
      message: "Ошибка при учете просмотра",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
