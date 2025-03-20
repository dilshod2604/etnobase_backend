import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../utils/prisma";
import {
  CreatePersonInput,
  UpdatePerssonInput,
} from "../../schemas/person/personSchema";
import { buildFilters } from "../../utils/buildFIlters";
import {
  filterByAge,
  filterByCityOfLive,
  filterByName,
  filterByNationality,
  filterByPersonType,
  filterByRole,
  filterBySex,
} from "../../filters/personFilters/personFIlter";
import { PersonQuery } from "../../types/types";
import { encodeIfCyrillic } from "../../utils/encodeIfCyrillic";

export const createPerson = async (
  req: FastifyRequest<{ Body: CreatePersonInput }>,
  reply: FastifyReply
) => {
  const data = req.body;
  const { roles, ...personData } = data;
  try {
    const personExist = await prisma.person.findFirst({
      where: {
        firstName: data.firstName!,
        lastName: data.lastName!,
      },
    });
    if (personExist) {
      return reply.status(400).send({
        message: `${personExist.firstName} ${personExist.lastName} уже существует`,
      });
    }
    const person = await prisma.person.create({
      data: personData,
    });
    if (roles.length > 0) {
      await prisma.personRoleMapping.createMany({
        data: roles.map((role) => ({
          personId: person.id,
          role: role.role,
        })),
      });
    }
    //временно
    const personWithRoles = await prisma.person.findUnique({
      where: { id: person.id },
      include: { roles: true },
    });

    reply.status(201).send(personWithRoles);
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка при создании Person", error: error });
  }
};

export const fetchPersons = async (
  req: FastifyRequest<{ Querystring: PersonQuery }>,
  reply: FastifyReply
) => {
  const { name, age, role, sex, person_type, nationality, cityOfLive, take } =
    req.query;
  const filter = buildFilters(
    [
      filterByName,
      filterByAge,
      filterByRole,
      filterBySex,
      filterByPersonType,
      filterByNationality,
      filterByCityOfLive,
    ],
    {
      name: name ? decodeURIComponent(name) : undefined,
      age: age,
      role,
      sex,
      person_type,
      nationality: nationality
        ? decodeURIComponent(nationality as string)
        : undefined,
      cityOfLive: cityOfLive
        ? decodeURIComponent(cityOfLive as string)
        : undefined,
    }
  );
  console.log("Filter", cityOfLive);
  try {
    const persons = await prisma.person.findMany({
      where: filter,
      include: {
        roles: true,
      },
      take: take ? Number(take) : undefined,
    });

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
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    if (!id || isNaN(Number(id))) {
      return reply.status(400).send({ message: "Id не существует" });
    }
    const person = await prisma.person.findFirst({
      where: {
        id: id,
      },
      omit: {
        phoneNumber: true,
      },
      include: {
        awards: true,
        filmography: true,
        image: true,
        video: true,
        sckills: true,
        theater: true,
        roles: true,
      },
    });

    console.log(person);
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
  req: FastifyRequest<{ Params: { id: number }; Body: UpdatePerssonInput }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const data = req.body;
  const { roles, ...personData } = data;
  try {
    const personExist = await prisma.person.findUnique({
      where: { id },
    });

    if (!personExist) {
      return reply.status(404).send({
        message: "Человек с таким ID не найден",
      });
    }

    const result = await prisma.$transaction(async (prisma) => {
      const person = await prisma.person.update({
        where: { id },
        data: personData,
      });

      await prisma.personRoleMapping.deleteMany({
        where: { personId: id },
      });

      await prisma.personRoleMapping.createMany({
        data: roles.map((role) => ({
          personId: id,
          role: role.role,
        })),
      });
      //временно
      const personWithRoles = await prisma.person.findUnique({
        where: { id: person.id },
        include: { roles: true },
      });

      return personWithRoles;
    });

    reply.status(200).send(result);
  } catch (error) {
    console.error(error);
    reply
      .status(500)
      .send({ message: "Ошибка при обновлении Person", error: error });
  }
};

export const deletePerson = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    if (!id || isNaN(Number(id))) {
      return reply.status(400).send({ message: "Id не существует" });
    }

    const person = await prisma.person.delete({
      where: {
        id: id,
      },
    });
    reply.status(200).send(person);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при обновлении пользователя" });
  }
};
