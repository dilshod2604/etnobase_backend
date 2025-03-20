import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { $ref } from "../../schemas/person/personSchema";
import {
  createPerson,
  deletePerson,
  fetchPersonById,
  fetchPersons,
  updatePerson,
} from "../../constrolers/person/personControllers";
import { searchPerson } from "../../constrolers/person/srearch_person/searchPersonsController";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/persons",
    {
      schema: {
        body: $ref("createPersonSchema"),
        response: {
          201: $ref("personResponseSchema"),
        },
      },
    },
    createPerson
  );

  fastify.get(
    "/persons",
    {
      schema: {
        response: {
          200: $ref("personsResponseSchema"),
        },
      },
    },
    fetchPersons
  );
  fastify.get(
    "/persons/:id",
    {
      schema: {
        params: $ref("personParamsSchema"),
        response: {
          200: $ref("onePersonResponseSchema"),
        },
      },
    },
    fetchPersonById
  );
  fastify.put(
    "/persons/:id",
    {
      schema: {
        params: $ref("personParamsSchema"),
        response: {
          200: $ref("personResponseSchema"),
        },
      },
    },
    updatePerson
  );
  fastify.delete(
    "/persons/:id",
    {
      schema: {
        params: $ref("personParamsSchema"),
        response: {
          204: $ref("personResponseSchema"),
        },
      },
    },
    deletePerson
  );
  fastify.get(
    "/persons/search",
    {
      schema: {
        response: {
          200: $ref("personsResponseSchema"),
        },
      },
    },
    searchPerson
  );
});
