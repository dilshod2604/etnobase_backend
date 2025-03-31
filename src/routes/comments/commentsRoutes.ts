import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  addComment,
  deleteComment,
  disLikeComments,
  fetchAllComments,
  fetchNewsComments,
  likeComment,
} from "../../constrolers/comment/commentsController";
import { $ref } from "../../schemas/comment/commentSchema";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/comments",

    {
      preHandler: [fastify.authJWT],
      schema: {
        body: $ref("AddCommentsSchema"),
        response: {
          200: $ref("CommentResponseSchema"),
        },
      },
    },
    addComment
  );

  fastify.post(
    "/coments/:id/:reaction/:userId",
    {
      preHandler: [fastify.authJWT],
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
            reaction: { type: "string", enum: ["like", "dislike"] },
            userId: { type: "number" },
          },
        },
      },
    },
    likeComment
  );
  fastify.delete(
    "/coments/:id/:reaction/:userID",
    {
      preHandler: [fastify.authJWT],
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
            reaction: { type: "string", enum: ["like", "dislike"] },
            userId: { type: "number" },
          },
        },
      },
    },
    disLikeComments
  );
  fastify.delete(
    "/comments/:id/:userId",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
            userId: { type: "number" },
          },
          required: ["id", "userId"],
        },
        response: {
          200: $ref("CommentResponseSchema"),
        },
      },
    },
    deleteComment
  );
  fastify.get(
    "/comments/:newsId",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            newsId: { type: "number" },
          },
        },
      },
    },
    fetchNewsComments
  );
  fastify.get("/comments", fetchAllComments);
});
