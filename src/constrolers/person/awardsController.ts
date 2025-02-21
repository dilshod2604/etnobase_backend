import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";
import {
  CreatePersonsAwardsInput,
  UppdatePersonAwardsInput,
} from "../../schemas/person/awards/personAwardsSchema";

export const createAwards = async (
  req: FastifyRequest<{ Body: CreatePersonsAwardsInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const awards = await prisma.personAwards.create({
      data,
    });
    reply.status(201).send(awards);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при создании награду" });
  }
};
export const updateAwards = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: UppdatePersonAwardsInput;
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const awards = await prisma.personAwards.update({
      where: {
        id,
      },
      data,
    });
    reply.status(200).send(awards);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при изменении награду" });
  }
};

export const deleteAwards = async (
  req: FastifyRequest<{
    Params: { id: number };
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  
  try {
    const awards = await prisma.personAwards.delete({
      where: {
        id,
      },
    });
    reply.status(200).send(awards);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении награду" });
  }
};
