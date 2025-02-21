"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.PersonsSckillsSchema = exports.personSckillsSchemaResponse = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const personSckillsSchema = zod_1.z.object({
    personId: zod_1.z.number().int(),
    name: zod_1.z.string().min(2).max(255),
    value: zod_1.z.string().min(2).max(255),
});
const createPersonSckillsSchema = personSckillsSchema;
exports.personSckillsSchemaResponse = personSckillsSchema.extend({
    id: zod_1.z.number().int(),
});
const updatePersonSckillsSchema = personSckillsSchema.omit({ personId: true });
const personSckillsParamsSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createPersonSckillsSchema,
    personSckillsSchemaResponse: exports.personSckillsSchemaResponse,
    updatePersonSckillsSchema,
    personSckillsParamsSchema,
}, { $id: "PersonSckills" }), exports.PersonsSckillsSchema = _a.schemas, exports.$ref = _a.$ref;
