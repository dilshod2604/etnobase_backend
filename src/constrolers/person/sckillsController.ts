import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreatePersonsSckillsInput,
  UppdatePersonSckillsInput,
} from "../../schemas/person/sckills/personSckillsSchema";
import { prisma } from "../../utils/prisma";

export const createSckills = async (
  req: FastifyRequest<{ Body: CreatePersonsSckillsInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const sckills = await prisma.personSckills.create({
      data,
    });
    reply.status(201).send(sckills);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при создании навыка" });
  }
};
export const updateSckills = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: UppdatePersonSckillsInput;
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const sckills = await prisma.personSckills.update({
      where: {
        id,
      },
      data,
    });
    reply.status(200).send(sckills);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при изменении навыка" });
  }
};

export const deleteSckills = async (
  req: FastifyRequest<{
    Params: { id: number };
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    const sckills = await prisma.personSckills.delete({
      where: {
        id,
      },
    });
    reply.status(200).send(sckills);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении навыка" });
  }
};
