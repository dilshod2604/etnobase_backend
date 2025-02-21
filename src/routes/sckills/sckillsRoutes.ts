import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { createSckills, deleteSckills, updateSckills } from "../../constrolers/person/sckillsController";
import { $ref } from "../../schemas/person/sckills/personSckillsSchema";
export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/sckills",
    {
      schema: {
        body: $ref("createPersonSckillsSchema"),
        response: {
          201: $ref("personSckillsSchemaResponse"),
        },
      },
    },
    createSckills
  );
  fastify.put(
    "/sckills/:id",
    {
      schema: {
        params: $ref("personSckillsParamsSchema"),
        body: $ref("updatePersonSckillsSchema"),
        response: {
          200: $ref("personSckillsSchemaResponse"),
        },
      },
    },
    updateSckills
  );
  fastify.delete(
    "/sckills/:id",
    {
      schema: {
        params:$ref("personSckillsParamsSchema"),
        response: {
          200: $ref("personSckillsSchemaResponse"),
        },
      },
    },
    deleteSckills
  );
});
