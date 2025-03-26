import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  createFAQ,
  deleteFAQ,
  fetchFAQ,
  updateFAQ,
} from "../../constrolers/FAQ/faqController";
import { $ref } from "../../schemas/FAQ/faqSchema";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/faq",
    {
      schema: {
        body: $ref("createFAQSchema"),
        response: {
          200: $ref("faqResponseSchema"),
        },
      },
    },
    createFAQ
  );
  fastify.put(
    "/faq/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        body: $ref("updateFAQSchema"),
        response: {
          200: $ref("faqResponseSchema"),
        },
      },
    },
    updateFAQ
  );
  fastify.delete(
    "/faq/:id",
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
          200: $ref("faqResponseSchema"),
        },
      },
    },
    deleteFAQ
  );
  fastify.get(
    "/faq",
    {
      schema: {
        response: {
          200: $ref("fetchAllFAQSchemas"),
        },
      },
    },
    fetchFAQ
  );
});
