import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";
import {
  CreatePersonInput,
  UpdatePerssonInput,
} from "../../schemas/person/personSchema";

export const createPerson = async (
  req: FastifyRequest<{ Body: CreatePersonInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  try {
    const personExist = await prisma.person.findFirst({
      where: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
    if (personExist) {
      reply.status(400).send({
        message: `${personExist.firstName} ${personExist.lastName} уже существует`,
      });
    }
    const person = await prisma.person.create({
      data: data,
    });
    reply.status(201).send(person);
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка при создании Person", error: error });
  }
};

export const fetchPersons = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const persons = await prisma.person.findMany();
    if (!persons || persons.length === 0) {
      return reply.status(404).send({
        message: "Пользователи не найдены",
      });
    }
    reply.status(200).send(persons);
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Oшибка при получение пользователей", error: error });
  }
};

export const fetchPersonById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    if (!id || isNaN(Number(id))) {
      return reply.status(400).send({ message: "Id не существует" });
    }
    const person = await prisma.person.findFirst({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        awards: true,
        filmography: true,
        image: true,
        video: true,
        sckills: true,
        theater: true,
      },
    });

    if (!person) {
      return reply.badRequest("Пользовател не найден");
    }
    reply.status(200).send(person);
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Oшибка при получение пользователя", error: error });
  }
};

export const updatePerson = async (
  req: FastifyRequest<{ Params: { id: string }; Body: UpdatePerssonInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  const { id } = req.params;
  try {
    if (!id || isNaN(Number(id))) {
      return reply.status(400).send({ message: "Id не существует" });
    }
    if (!data || Object.keys(data).length === 0) {
      return reply.status(400).send({ message: "Нет данных для обновления" });
    }
    const person = await prisma.person.update({
      where: {
        id: parseInt(id, 10),
      },
      data: data,
    });
    reply.status(200).send(person);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обновлении пользователя" });
  }
};

export const deletePerson = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    if (!id || isNaN(Number(id))) {
      return reply.status(400).send({ message: "Id не существует" });
    }

    const person = await prisma.person.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    reply.status(200).send(person);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обновлении пользователя" });
  }
};
