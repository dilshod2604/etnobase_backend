import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";
import {
  creatFilmographyInput,
  updateFilmographyInput,
} from "../../schemas/person/filmography/personFilmography.schema";
//create
export const createFilmography = async (
  req: FastifyRequest<{
    Body: creatFilmographyInput;
  }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const filmography = await prisma.filmography.create({
      data: data,
      
    });
    reply.status(201).send(filmography);
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка при создании фильмографию", error: error });
  }
};
//update
export const updateFilmography = async (
  req: FastifyRequest<{ Params: { id: number }; Body: updateFilmographyInput }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const data = req.body;
  try {
    if (!data || Object.keys(data).length === 0) {
      return reply.status(400).send({ message: "Нет данных для обновления" });
    }
    const filmogrphy = await prisma.filmography.update({
      where: {
        id,
      },
      data,
    });
    reply.status(200).send(filmogrphy);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обновении фильмографию" });
  }
};
//delete
export const deleteFilmography = async (
  req: FastifyRequest<{ Params: { id: number };}>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  console.log("zgfhjkl;",id)
  try {
    const filmogrphy = await prisma.filmography.delete({
      where: {
        id
      },
    });
    reply.status(200).send(filmogrphy);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при удалении фильмографию" });
  }
};
