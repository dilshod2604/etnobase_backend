import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  createFilmography,
  deleteFilmography,
  updateFilmography,
} from "../../constrolers/person/filmographyController";
import { $ref } from "../../schemas/person/filmography/personFilmography.schema";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/filmography",
    {
      schema: {
        body: $ref("createFilmographySchema"),
        response: {
          201: $ref("filmographySchemaResponse"),
        },
      },
    },
    createFilmography
  );
  fastify.delete(
    "/filmography/:id",
    {
      schema: {
        params: $ref("filmogramphyParmasSchema"),
        response: {
          200: $ref("filmographySchemaResponse"),
        },
      },
    },
    deleteFilmography
  );

  fastify.put(
    "/filmography/:id",
    {
      schema: {
        params: $ref("filmogramphyParmasSchema"),
        body: $ref("updateFilmography"),
        response: {
          200: $ref("updateFilmography"),
        },
      },
    },
    updateFilmography
  );
});
