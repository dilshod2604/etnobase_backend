"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.uploadPersonImageSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const uploadPersonImageResponse = zod_1.z.object({
    message: zod_1.z.string(),
    urls: zod_1.z.array(zod_1.z.string()).optional(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    uploadPersonImageResponse,
}, { $id: "uploadPersonImage" }), exports.uploadPersonImageSchema = _a.schemas, exports.$ref = _a.$ref;
