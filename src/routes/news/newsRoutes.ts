import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  createNews,
  deleteNews,
  fetchNews,
  fetchNewsById,
  handleLikeDislikeNews,
  updateNews,
} from "../../constrolers/news/newsController";
import { $ref } from "../../schemas/news/newsSchema";
import { uploadAwatar } from "../../constrolers/person/uploadAwatar";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/news",
    {
      schema: {
        body: $ref("createNewsSchema"),
        response: {
          201: $ref("newsResponse"),
        },
      },
    },
    createNews
  );
  fastify.put(
    "/news/:id",
    {
      schema: {
        body: $ref("updateNewsSchema"),
        response: {
          201: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    updateNews
  );
  fastify.delete(
    "/news/:id",
    {
      schema: {
        response: {
          201: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    deleteNews
  );
  fastify.get(
    "/news/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
        // response: {
        //   200: $ref("newsResponse"),
        // },
      },
    },
    fetchNewsById
  );
  fastify.get("/news", fetchNews);
  fastify.post(
    "/news/poster",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              url: { type: "string" },
            },
          },
        },
      },
    },
    uploadAwatar
  );
  fastify.post(
    "/news/like",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            newsId: { type: "number" },
            reaction: { type: "string", enum: ["like", "dislike"] },
            userId: { type: "number" },
          },
          required: ["newsId", "reaction", "userId"],
        },
        // response: {
        //   200: {
        //     type: "object",
        //     properties: {
        //       id: { type: "number" },
        //       likes: { type: "number" },
        //       dislikes: { type: "number" },
        //     },
        //   },
        // },
      },
    },
    handleLikeDislikeNews
  );
});
