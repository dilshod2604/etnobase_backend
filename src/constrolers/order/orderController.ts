import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateOrderSchemaInput,
  UpdateOrderInputSchema,
} from "../../schemas/order/orderSchema";
import { prisma } from "../../utils/prisma";

export const makeOrder = async (
  req: FastifyRequest<{ Body: CreateOrderSchemaInput }>,
  reply: FastifyReply
) => {
  const { userId, personId, senderName, message, phoneNumber } = req.body;
  try {
    const person = await prisma.person.findFirst({
      where: {
        id: personId,
      },
    });
    const existingOrder = await prisma.order.findFirst({
      where: { userId, personId },
    });
    if (existingOrder) {
      return reply.status(400).send({ message: "Заказ уже существует" });
    }
    await prisma.order.create({
      data: {
        message,
        phoneNumber,
        senderName,
        userId,
        personId,
      },
    });
    reply.status(200).send({ message: "Заказ отправлен успешно" });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка создания заказа" });
  }
};
export const deleteOrder = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    await prisma.order.delete({
      where: {
        id,
      },
    });
    reply.status(200).send({ message: "Заказ удален успешно" });
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrders = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await prisma.order.deleteMany();
    reply.status(200).send({ message: "Заказы успешно удалено" });
  } catch (error) {
    console.error(error);
  }
};
export const updateOrderStatus = async (
  req: FastifyRequest<{ Params: { id: number }; Body: UpdateOrderInputSchema }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const { orderStatus } = req.body;
  try {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        orderStatus,
      },
    });
    reply.status(200).send({ message: "Статус заказа изменен " });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при изменении статуса заказа" });
  }
};
export const getOrdersByUserId = async (
  req: FastifyRequest<{ Params: { userId: number } }>,
  reply: FastifyReply
) => {
  const { userId } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        person: {
          include: {
            roles: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });
    if (orders.length === 0) {
      return reply.status(404).send({ message: "Заказы не найдены" });
    }
    reply.status(200).send(orders);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при получении заказов" });
  }
};

export const getOrderById = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: {
        id,
      },
      include: {
        person: {
          omit: {
            phoneNumber: true,
          },
          include: {
            roles: {
              select: {
                role: true,
              },
            },
          },
        },
      },
    });
    if (orders.length === 0) {
      return reply.status(404).send({ message: "Заказы не найдены" });
    }
    reply.status(200).send(orders);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при получении заказов" });
  }
};
export const getOrders = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        person: {
          omit: {
            phoneNumber: true,
          },
        },
      },
    });
    reply.status(200).send(orders);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при получении заказов" });
  }
};
