import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../utils/prisma";
import { buildFilters } from "../../../utils/buildFIlters";
import {
  filterByCityOfLive,
  filterByName,
  filterBySex,
} from "../../../filters/personFilters/personFIlter";

export const searchPerson = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, city, sex } = req.query as {
    name: string;
    sex: string;
    city: string;
  };
  try {
    if (!name) {
      return reply.status(400).send({ message: "Необходимо ввести имя" });
    }

    const search = buildFilters(
      [filterByName, filterBySex, filterByCityOfLive],
      {
        name: decodeURIComponent(name),
        sex,
        cityOfLive: decodeURIComponent(city ? city : ""),
      }
    );
    const persons = await prisma.person.findMany({
      where: search,
      include: {
        roles: true,
      },
    });
    if (persons.length === 0) {
      return reply
        .status(404)
        .send({ message: "Персонажей с таким именем не найдено" });
    }
    reply.status(200).send(persons);
  } catch (error) {
    console.error(error);
  }
};
