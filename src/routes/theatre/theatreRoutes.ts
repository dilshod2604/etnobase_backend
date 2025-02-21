import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { $ref } from "../../schemas/person/theatre/personTheatreSchema";
import {
  createTheatre,
  deleteTheatre,
  updateTheatre,
} from "../../constrolers/person/theatreController";
export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/theatre",
    {
      schema: {
        body: $ref("createPersonTheatreSchema"),
        response: {
          201: $ref("personTheatreSchemaResponse"),
        },
      },
    },
    createTheatre
  );
  fastify.put(
    "/theatre/:id",
    {
      schema: {
        params: $ref("personTheatreParamsSchema"),
        body: $ref("updatePersonTheatreSchema"),
        response: {
          200: $ref("personTheatreSchemaResponse"),
        },
      },
    },
    updateTheatre
  );
  fastify.delete(
    "/theatre/:id",
    {
      schema: {
        params: $ref("personTheatreParamsSchema"),
        response: {
          200: $ref("personTheatreSchemaResponse"),
        },
      },
    },
    deleteTheatre
  );
});
