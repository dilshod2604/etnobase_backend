"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.PersonsAwardsSchema = exports.personAwardsSchemaResponse = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const personAwardsSchema = zod_1.z.object({
    personId: zod_1.z.number().int(),
    name: zod_1.z.string().min(2).max(255),
    value: zod_1.z.string().min(2).max(255),
});
const createPersonAwardsSchema = personAwardsSchema;
exports.personAwardsSchemaResponse = personAwardsSchema.extend({
    id: zod_1.z.number().int(),
});
const updatePersonAwardsSchema = personAwardsSchema.omit({ personId: true });
const personAwardsParamsSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createPersonAwardsSchema,
    personAwardsSchemaResponse: exports.personAwardsSchemaResponse,
    updatePersonAwardsSchema,
    personAwardsParamsSchema,
}, { $id: "PersonAwards" }), exports.PersonsAwardsSchema = _a.schemas, exports.$ref = _a.$ref;
