import { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../../utils/prisma";
import {
  CreatePersonsTheatreInput,
  UppdatePersonTheatreInput,
} from "../../schemas/person/theatre/personTheatreSchema";

export const createTheatre = async (
  req: FastifyRequest<{ Body: CreatePersonsTheatreInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const theatre = await prisma.theater.create({
      data,
    });
    reply.status(201).send(theatre);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при создании театра" });
  }
};
export const updateTheatre = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: UppdatePersonTheatreInput;
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const theatre = await prisma.theater.update({
      where: {
        id,
      },
      data,
    });
    reply.status(200).send(theatre);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при изменении театра" });
  }
};

export const deleteTheatre = async (
  req: FastifyRequest<{
    Params: { id: number };
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    const theatre = await prisma.theater.delete({
      where: {
        id,
      },
    });
    reply.status(200).send(theatre);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении театра" });
  }
};
