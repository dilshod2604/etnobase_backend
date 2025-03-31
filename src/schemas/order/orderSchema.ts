import { buildJsonSchemas } from "fastify-zod";
import { OrderStatus } from "@prisma/client";
import { z } from "zod";

const orderSchema = z.object({
  userId: z.number().int(),
  personId: z.number().int(),
  senderName: z.string(),
  message: z.string(),
  phoneNumber: z.string(),
  id: z.number().int(),
  createdAt: z.date(),
  orderStatus: z.nativeEnum(OrderStatus),
  read: z.boolean(),
});
const orderResponseSchema = z.object({
  message: z.string(),
});
const createOrderSchema = orderSchema.omit({
  createdAt: true,
  id: true,
  orderStatus: true,
  read: true,
});
const getAllOrderSchemas = z.array(orderSchema);
const updateOrdersStatusSchema = z.object({
  orderStatus: z.nativeEnum(OrderStatus),
});
const updateOrderRead = z.object({
  read: z.boolean(),
});

export type CreateOrderSchemaInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInputSchema = z.infer<typeof updateOrdersStatusSchema>;
export const { schemas: OrderSchema, $ref } = buildJsonSchemas(
  {
    orderResponseSchema,
    createOrderSchema,
    updateOrdersStatusSchema,
    updateOrderRead,
    getAllOrderSchemas,
  },
  { $id: "Order" }
);
