"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.OrderSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const orderSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    personId: zod_1.z.number().int(),
    senderName: zod_1.z.string(),
    message: zod_1.z.string(),
    phoneNumber: zod_1.z.string(),
});
const orderResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
const createOrderSchema = orderSchema;
const updateOrdersStatusSchema = zod_1.z.object({
    orderStatus: zod_1.z.nativeEnum(client_1.OrderStatus),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({ orderResponseSchema, createOrderSchema, updateOrdersStatusSchema }, { $id: "Order" }), exports.OrderSchema = _a.schemas, exports.$ref = _a.$ref;
