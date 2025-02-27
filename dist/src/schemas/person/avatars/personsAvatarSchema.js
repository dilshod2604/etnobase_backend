"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.PersonAvatarSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const personAvatarSchema = zod_1.z.object({
    path: zod_1.z.string(),
});
const personAvatarsResponse = personAvatarSchema;
_a = (0, fastify_zod_1.buildJsonSchemas)({
    personAvatarsResponse,
}, { $id: "PersonAvatar" }), exports.PersonAvatarSchema = _a.schemas, exports.$ref = _a.$ref;
