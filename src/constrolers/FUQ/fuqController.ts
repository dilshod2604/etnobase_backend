import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";
import {
  CreateFUQSchemaInput,
  UpdateFUQSchemaInput,
} from "../../schemas/FUQ/fuqSchema";

export const createFUQ = async (
  req: FastifyRequest<{
    Body: CreateFUQSchemaInput;
  }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const fuq = await prisma.fUQ.create({
      data: data,
    });
    reply.status(201).send({ message: "FUQ успешно создалось" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при создании нового FUQ" });
  }
};
export const updateFUQ = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: UpdateFUQSchemaInput;
  }>,
  reply: FastifyReply
) => {
  const data = req.body;
  const { id } = req.params;
  try {
    const fuq = await prisma.fUQ.update({
      where: {
        id,
      },
      data: data,
    });
    reply.status(200).send({ message: "FUQ успешно обновлено" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обновлении FUQ" });
  }
};
export const deleteFUQ = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    const fuq = await prisma.fUQ.delete({
      where: {
        id,
      },
    });
    reply.status(201).send({ message: "FUQ успешно обновлено" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении FUQ" });
  }
};

export const fetchFUQ = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const fuq = await prisma.fUQ.findMany();
    reply.status(201).send(fuq);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при получении FUQ" });
  }
};
