"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.PersonImageScheme = exports.personImageResponse = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const personImageSchema = zod_1.z.object({
    personId: zod_1.z.number().int(),
    src: zod_1.z.string(),
});
const createPersonImageSchema = personImageSchema;
const updatePersonImageSchema = personImageSchema.omit({ personId: true });
exports.personImageResponse = personImageSchema.extend({
    id: zod_1.z.number().int(),
});
const personImageParamsSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createPersonImageSchema,
    updatePersonImageSchema,
    personImageResponse: exports.personImageResponse,
    personImageParamsSchema,
}, { $id: "PersonImage" }), exports.PersonImageScheme = _a.schemas, exports.$ref = _a.$ref;
