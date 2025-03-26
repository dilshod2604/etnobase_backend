import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  createFUQ,
  deleteFUQ,
  fetchFUQ,
  updateFUQ,
} from "../../constrolers/FUQ/fuqController";
import { $ref } from "../../schemas/FUQ/fuqSchema";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/fuq",
    {
      schema: {
        body: $ref("createFUQSchema"),
        response: {
          200: $ref("fuqResponseSchema"),
        },
      },
    },
    createFUQ
  );
  fastify.put(
    "/fuq/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        response: {
          200: $ref("fuqResponseSchema"),
        },
      },
    },
    updateFUQ
  );
  fastify.delete(
    "/fuq/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        response: {
          200: $ref("fuqResponseSchema"),
        },
      },
    },
    deleteFUQ
  );
  fastify.get(
    "/fuq",
    {
      schema: {
        response: {
          200: $ref("createFUQSchema"),
        },
      },
    },
    fetchFUQ
  );
});
