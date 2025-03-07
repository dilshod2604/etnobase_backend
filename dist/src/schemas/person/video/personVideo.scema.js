"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.PersonVideoScheme = exports.personVideoResponse = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const personVideoSchema = zod_1.z.object({
    personId: zod_1.z.number().int(),
    src: zod_1.z.string(),
});
const createPersoVideo = zod_1.z.object({
    personId: zod_1.z.number().int(),
    urls: zod_1.z.array(zod_1.z.string()),
});
const createPersonVideoSchema = createPersoVideo;
const createPersonVideoResponse = zod_1.z.object({
    message: zod_1.z.string(),
});
const updatePersonVideoSchema = personVideoSchema.omit({ personId: true });
exports.personVideoResponse = personVideoSchema.extend({
    id: zod_1.z.number().int(),
});
const personVideoParamsSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    createPersonVideoResponse,
    createPersonVideoSchema,
    updatePersonVideoSchema,
    personVideoResponse: exports.personVideoResponse,
    personVideoParamsSchema,
}, { $id: "PersonVideo" }), exports.PersonVideoScheme = _a.schemas, exports.$ref = _a.$ref;
