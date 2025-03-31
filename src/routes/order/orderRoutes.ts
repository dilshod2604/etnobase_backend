import {
  getOrderById,
  getOrders,
  updateOrderRead,
} from "./../../constrolers/order/orderController";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  deleteOrder,
  deleteOrders,
  getOrdersByUserId,
  makeOrder,
  updateOrderStatus,
} from "../../constrolers/order/orderController";
import { $ref } from "../../schemas/order/orderSchema";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/order",
    {
      preHandler: [fastify.authJWT],
      schema: {
        body: $ref("createOrderSchema"),
        response: {
          200: $ref("orderResponseSchema"),
        },
      },
    },
    makeOrder
  );
  fastify.put(
    "/order/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        body: $ref("updateOrdersStatusSchema"),
        response: {
          200: $ref("orderResponseSchema"),
        },
      },
    },
    updateOrderStatus
  );
  fastify.delete(
    "/order/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        response: {
          200: $ref("orderResponseSchema"),
        },
      },
    },
    deleteOrder
  );
  fastify.delete(
    "/order/delete-all",
    {
      schema: {
        response: {
          200: $ref("orderResponseSchema"),
        },
      },
    },
    deleteOrders
  );
  fastify.get(
    "/orders/:userId",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            userId: { type: "number" },
          },
          required: ["userId"],
        },
      },
    },
    getOrdersByUserId
  );
  fastify.get(
    "/order/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
      },
    },
    getOrderById
  );
  fastify.get(
    "/orders",
    {
      schema: {
        response: {
          200: $ref("getAllOrderSchemas"),
        },
      },
    },
    getOrders
  );
  fastify.put(
    "/order/read/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        body: $ref("updateOrderRead"),
        response: {
          200: $ref("orderResponseSchema"),
        },
      },
    },
    updateOrderRead
  );
});
