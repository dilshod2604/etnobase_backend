import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";
import {
  CreateFAQSchemaInput,
  UpdateFAQSchemaInput,
} from "../../schemas/FAQ/faqSchema";

export const createFAQ = async (
  req: FastifyRequest<{
    Body: CreateFAQSchemaInput;
  }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    await prisma.fAQ.create({
      data: data,
    });
    reply.status(201).send({ message: "FAQ успешно создалось" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при создании нового FAQ" });
  }
};
export const updateFAQ = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: UpdateFAQSchemaInput;
  }>,
  reply: FastifyReply
) => {
  const data = req.body;
  const { id } = req.params;
  try {
    await prisma.fAQ.update({
      where: {
        id,
      },
      data: data,
    });
    reply.status(200).send({ message: "FAQ успешно обновлено" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обновлении FAQ" });
  }
};
export const deleteFAQ = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    await prisma.fAQ.delete({
      where: {
        id,
      },
    });
    reply.status(201).send({ message: "FAQ успешно обновлено" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении FAQ" });
  }
};

export const fetchFAQ = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const faq = await prisma.fAQ.findMany();
    reply.status(201).send(faq);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при получении FAQ" });
  }
};
