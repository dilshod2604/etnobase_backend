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
