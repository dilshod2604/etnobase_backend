import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import {
  deleteOrder,
  getOrdersByUserId,
  makeOrder,
  updateOrderStatus,
} from "../../constrolers/order/orderController";
import { $ref } from "../../schemas/order/orderSchema";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/order",
    {
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
  fastify.get(
    "/order/:userId",
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
  fastify.get("/order", getOrdersByUserId);
});
