"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.NewsSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const newsSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    poster: zod_1.z.string().optional().nullable(),
    sourceNews: zod_1.z.string().optional().nullable(),
    phoneNumber: zod_1.z.string().optional().nullable(),
    createdAt: zod_1.z.date(),
});
const createNewsSchema = newsSchema.omit({ id: true, createdAt: true });
const newsResponse = newsSchema;
const getAllNewsSchemas = zod_1.z.array(newsSchema);
const updateNewsSchema = newsSchema.omit({ id: true, createdAt: true });
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createNewsSchema,
    newsResponse,
    updateNewsSchema,
    getAllNewsSchemas
}, { $id: "News" }), exports.NewsSchema = _a.schemas, exports.$ref = _a.$ref;
