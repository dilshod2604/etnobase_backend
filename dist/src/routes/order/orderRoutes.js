"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderController_1 = require("./../../constrolers/order/orderController");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const orderController_2 = require("../../constrolers/order/orderController");
const orderSchema_1 = require("../../schemas/order/orderSchema");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/order", {
        preHandler: [fastify.authJWT],
        schema: {
            body: (0, orderSchema_1.$ref)("createOrderSchema"),
            response: {
                200: (0, orderSchema_1.$ref)("orderResponseSchema"),
            },
        },
    }, orderController_2.makeOrder);
    fastify.put("/order/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" },
                },
                required: ["id"],
            },
            body: (0, orderSchema_1.$ref)("updateOrdersStatusSchema"),
            response: {
                200: (0, orderSchema_1.$ref)("orderResponseSchema"),
            },
        },
    }, orderController_2.updateOrderStatus);
    fastify.delete("/order/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" },
                },
                required: ["id"],
            },
            response: {
                200: (0, orderSchema_1.$ref)("orderResponseSchema"),
            },
        },
    }, orderController_2.deleteOrder);
    fastify.delete("/order/delete-all", {
        schema: {
            response: {
                200: (0, orderSchema_1.$ref)("orderResponseSchema"),
            },
        },
    }, orderController_2.deleteOrders);
    fastify.get("/orders/:userId", {
        schema: {
            params: {
                type: "object",
                properties: {
                    userId: { type: "number" },
                },
                required: ["userId"],
            },
        },
    }, orderController_2.getOrdersByUserId);
    fastify.get("/order/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" },
                },
                required: ["id"],
            },
        },
    }, orderController_1.getOrderById);
    fastify.get("/orders", {
        schema: {
            response: {
                200: (0, orderSchema_1.$ref)("getAllOrderSchemas"),
            },
        },
    }, orderController_1.getOrders);
    fastify.put("/order/read/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" },
                },
                required: ["id"],
            },
            body: (0, orderSchema_1.$ref)("updateOrderRead"),
            response: {
                200: (0, orderSchema_1.$ref)("orderResponseSchema"),
            },
        },
    }, orderController_1.updateOrderRead);
}));
