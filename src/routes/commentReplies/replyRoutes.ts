import { fetchCommentReply } from "./../../constrolers/comment/replyController/commentsReplyController";
import { FastifyInstance } from "fastify";

import fp from "fastify-plugin";
import {
  addCommentReply,
  deleteCommentReply,
  likeDislikeCommmentReply,
} from "../../constrolers/comment/replyController/commentsReplyController";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/comment/reply",
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
    "/comment/reply",
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
    "/comment/reply/like",
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
    "/comment/reply/:commentId",
    {
      schema: {
        tags: ["commentReply"],
        params: {
          type: "object",
          properties: {
            commentId: { type: "number" },
          },
          required: ["commentId"],
        },
      },
    },
    fetchCommentReply
  );
});
