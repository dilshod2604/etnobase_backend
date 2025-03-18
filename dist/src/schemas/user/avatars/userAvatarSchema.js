"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.UserAvatarSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const userAvatarSchema = zod_1.z.object({
    url: zod_1.z.string().optional(),
});
const userAvatarsResponse = userAvatarSchema;
_a = (0, fastify_zod_1.buildJsonSchemas)({
    userAvatarsResponse,
}, { $id: "UserAvatar" }), exports.UserAvatarSchema = _a.schemas, exports.$ref = _a.$ref;
