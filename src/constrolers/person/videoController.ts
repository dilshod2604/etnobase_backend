import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";
import { CreatePersonVideoSchemaInput, UpdatePersonVideoSchemaInput } from "../../schemas/person/video/personVideo.scema";


export const createVideo = async (
  req: FastifyRequest<{ Body: CreatePersonVideoSchemaInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const video = await prisma.personVideo.create({
      data: data,
    });
    reply.status(201).send(video);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при создании видео" });
  }
};

export const updateVideo = async (
  req: FastifyRequest<{
    Params: { id: number };
    Body: UpdatePersonVideoSchemaInput;
  }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const video = await prisma.personVideo.update({
      where: {
        id,
      },
      data,
    });
    reply.status(200).send(video);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обновлении видео" });
  }
};

export const deleteVideo = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    const video = await prisma.personVideo.delete({
      where: {
        id,
      },
    });
    reply.status(200).send(video);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении видео" });
  }
};
