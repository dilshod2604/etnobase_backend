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
const commentsReplyController_1 = require("../../constrolers/comment/replyController/commentsReplyController");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/commentreply", {
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
    }, commentsReplyController_1.addCommentReply);
    fastify.delete("/commentreply", {
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
    }, commentsReplyController_1.deleteCommentReply);
    fastify.post("/commentreply/like", {
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
    }, commentsReplyController_1.likeDislikeCommmentReply);
    fastify.get("/commentreply", {
        schema: {
            tags: ["commentReply"],
        },
    }, commentsReplyController_1.fetchAllCommentsReply);
}));
