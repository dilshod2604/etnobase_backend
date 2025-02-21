import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";
import {
  CreatePersonImageSchemaInput,
  UpdatePersonImageSchemaInput,
} from "../../schemas/person/image/personImage";

export const createImage = async (
  req: FastifyRequest<{ Body: CreatePersonImageSchemaInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const image = await prisma.personImage.create({
      data: data,
    });
    reply.status(201).send(image);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при создании фото" });
  }
};

export const updateImage = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: UpdatePersonImageSchemaInput;
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const image = await prisma.personImage.update({
      where: {
        id,
      },
      data,
    });
    reply.status(200).send(image);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обновлении фото" });
  }
};

export const deleteImage = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    const image = await prisma.personImage.delete({
      where: {
        id,
      },
    });
    reply.status(200).send(image);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении фото" });
  }
};
