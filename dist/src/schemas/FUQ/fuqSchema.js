"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.FUQSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const fuqSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    question: zod_1.z.string(),
    answer: zod_1.z.string(),
});
const createFUQSchema = fuqSchema.omit({ id: true });
const updateFUQSchema = fuqSchema.omit({ id: true });
const fuqResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
const fetchAllFUQSchemas = zod_1.z.array(fuqSchema);
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createFUQSchema,
    updateFUQSchema,
    fuqResponseSchema,
    fetchAllFUQSchemas
}, { $id: "FUQ" }), exports.FUQSchema = _a.schemas, exports.$ref = _a.$ref;
