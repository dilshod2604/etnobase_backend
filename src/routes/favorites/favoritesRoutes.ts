import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  addFavorites,
  checkFavorite,
  getFavorites,
  removeAllFavorites,
  removeFavorites,
} from "../../constrolers/user/favorites/favoritesController";
import { $ref } from "../../schemas/user/favorites/userFavoritesSchema";
export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/favorites/add",
    {
      schema: {
        body: $ref("userFavoritesSchema"),
        response: {
          201: $ref("userFavoritesResponseSchema"),
        },
      },
    },
    addFavorites
  );
  fastify.delete(
    "/favorites/remove",
    {
      schema: {
        body: $ref("userFavoritesSchema"),
        response: {
          200: $ref("userFavoritesResponseSchema"),
        },
      },
    },
    removeFavorites
  );
  fastify.delete(
    "/favorites/remove-all",
    {
      schema: {
        body: $ref("deleteAllFavoritesSchema"),
        response: {
          200: $ref("userFavoritesResponseSchema"),
        },
      },
    },
    removeAllFavorites
  );
  fastify.get(
    "/favorites/:userId",
    {
      schema: {
        response: {
          200: $ref("getUserFavoritesPersonsSchema"),
        },
      },
    },
    getFavorites
  );
  fastify.get(
    "/favorites/check",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            userId: { type: "number" },
            personId: { type: "number" },
          },
          required: ["userId", "personId"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              isFavorite: { type: "boolean" },
            },
          },
        },
      },
    },
    checkFavorite
  );
});
