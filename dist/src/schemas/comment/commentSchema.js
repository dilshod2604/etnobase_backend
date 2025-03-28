"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.CommentSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const commentSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    newsId: zod_1.z.number().int(),
    userId: zod_1.z.number().int(),
    text: zod_1.z.string(),
    likes: zod_1.z.number().int().default(0),
    dislikes: zod_1.z.number().int().default(0),
});
const AddCommentsSchema = commentSchema.omit({
    dislikes: true,
    likes: true,
    id: true,
});
const UppdateCommentsLikesSchema = commentSchema.pick({
    likes: true,
    dislikes: true,
});
const CommentResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
const getAllCommentsResponseSchema = zod_1.z.array(commentSchema.extend({
    userName: zod_1.z.string(),
}));
_a = (0, fastify_zod_1.buildJsonSchemas)({
    AddCommentsSchema,
    UppdateCommentsLikesSchema,
    CommentResponseSchema,
    getAllCommentsResponseSchema,
}, { $id: "Comment" }), exports.CommentSchema = _a.schemas, exports.$ref = _a.$ref;
