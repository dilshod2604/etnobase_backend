import { FastifyInstance } from "fastify";

import fp from "fastify-plugin";
import {
  addCommentReply,
  deleteCommentReply,
  fetchAllCommentsReply,
  likeDislikeCommmentReply,
} from "../../constrolers/comment/replyController/commentsReplyController";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/commentreply",
    {
      schema: {
        tags: ["commentReply"],
        body: {
          type: "object",
          properties: {
            commentId: { type: "number" },
            userId: { type: "number" },
            text: { type: "string" },
          },
          required: ["commentId", "userId", "text"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    addCommentReply
  );
  fastify.delete(
    "/commentreply",
    {
      schema: {
        tags: ["commentReply"],
        body: {
          type: "object",
          properties: {
            commentId: { type: "number" },
            userId: { type: "number" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              message: { type: "string" },
            },
          },
        },
      },
    },
    deleteCommentReply
  );
  fastify.post(
    "/commentreply/like",
    {
      schema: {
        tags: ["commentReply"],
        body: {
          type: "object",
          properties: {
            commentId: { type: "number" },
            userId: { type: "number" },
            reaction: { type: "string", enum: ["like", "dislike"] },
          },
          required: ["commentId", "userId", "reaction"],
        },
      },
    },
    likeDislikeCommmentReply
  );
  fastify.get(
    "/commentreply",
    {
      schema: {
        tags: ["commentReply"],
      },
    },
    fetchAllCommentsReply
  );
});
