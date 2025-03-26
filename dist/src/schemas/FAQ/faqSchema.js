"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.FAQSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const faqSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
    question: zod_1.z.string(),
    answer: zod_1.z.string(),
});
const createFAQSchema = faqSchema.omit({ id: true });
const updateFAQSchema = faqSchema.omit({ id: true });
const faqResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
const fetchAllFAQSchemas = zod_1.z.array(faqSchema);
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createFAQSchema,
    updateFAQSchema,
    faqResponseSchema,
    fetchAllFAQSchemas
}, { $id: "FAQ" }), exports.FAQSchema = _a.schemas, exports.$ref = _a.$ref;
