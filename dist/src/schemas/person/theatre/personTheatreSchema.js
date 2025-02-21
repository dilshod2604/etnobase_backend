"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.PersonsTheatreSchema = exports.personTheatreSchemaResponse = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const personTheatreSchema = zod_1.z.object({
    personId: zod_1.z.number().int(),
    name: zod_1.z.string().min(2).max(255),
    description: zod_1.z.string().min(2).max(255),
});
const createPersonTheatreSchema = personTheatreSchema;
exports.personTheatreSchemaResponse = personTheatreSchema.extend({
    id: zod_1.z.number().int(),
});
const updatePersonTheatreSchema = personTheatreSchema.omit({ personId: true });
const personTheatreParamsSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createPersonTheatreSchema,
    personTheatreSchemaResponse: exports.personTheatreSchemaResponse,
    updatePersonTheatreSchema,
    personTheatreParamsSchema,
}, { $id: "PersonTheatre" }), exports.PersonsTheatreSchema = _a.schemas, exports.$ref = _a.$ref;
