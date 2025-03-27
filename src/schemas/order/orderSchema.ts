import { buildJsonSchemas } from "fastify-zod";
import { OrderStatus } from "@prisma/client";
import { z } from "zod";

const orderSchema = z.object({
  userId: z.number().int(),
  personId: z.number().int(),
  senderName: z.string(),
  message: z.string(),
  phoneNumber: z.string(),
});
const orderResponseSchema = z.object({
  message: z.string(),
});
const createOrderSchema = orderSchema;
const updateOrdersStatusSchema = z.object({
  orderStatus: z.nativeEnum(OrderStatus),
});

export type CreateOrderSchemaInput = z.infer<typeof orderSchema>;
export type UpdateOrderInputSchema = z.infer<typeof updateOrdersStatusSchema>;
export const { schemas: OrderSchema, $ref } = buildJsonSchemas(
  { orderResponseSchema, createOrderSchema, updateOrdersStatusSchema },
  { $id: "Order" }
);
