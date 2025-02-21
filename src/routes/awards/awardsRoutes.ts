import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { $ref } from "../../schemas/person/awards/personAwardsSchema";
import {
  createAwards,
  deleteAwards,
  updateAwards,
} from "../../constrolers/person/awardsController";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/awards",
    {
      schema: {
        body: $ref("createPersonAwardsSchema"),
        response: {
          201: $ref("personAwardsSchemaResponse"),
        },
      },
    },
    createAwards
  );
  fastify.put(
    "/awards/:id",
    {
      schema: {
        params: $ref("personAwardsParamsSchema"),
        body: $ref("updatePersonAwardsSchema"),
        response: {
          200: $ref("personAwardsSchemaResponse"),
        },
      },
    },
    updateAwards
  );
  fastify.delete(
    "/awards/:id",
    {
      schema: {
        params: $ref("personAwardsParamsSchema"),
        response: {
          200: $ref("personAwardsSchemaResponse"),
        },
      },
    },
    deleteAwards
  );
});
