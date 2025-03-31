"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const commentsController_1 = require("../../constrolers/comment/commentsController");
const commentSchema_1 = require("../../schemas/comment/commentSchema");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/comments", {
        preHandler: [fastify.authJWT],
        schema: {
            body: (0, commentSchema_1.$ref)("AddCommentsSchema"),
            response: {
                200: (0, commentSchema_1.$ref)("CommentResponseSchema"),
            },
        },
    }, commentsController_1.addComment);
    fastify.post("/coments/:id/:reaction/:userID", {
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
    }, commentsController_1.likeComment);
    fastify.delete("/coments/:id/:reaction/:userID", {
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
    }, commentsController_1.disLikeComments);
    fastify.delete("/comments/:id/:userId", {
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
                200: (0, commentSchema_1.$ref)("CommentResponseSchema"),
            },
        },
    }, commentsController_1.deleteComment);
    fastify.get("/comments/:newsId", {
        schema: {
            params: {
                type: "object",
                properties: {
                    newsId: { type: "number" },
                },
            },
        },
    }, commentsController_1.fetchNewsComments);
    fastify.get("/comments", commentsController_1.fetchAllComments);
}));
