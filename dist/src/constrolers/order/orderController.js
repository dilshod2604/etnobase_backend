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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderRead = exports.getOrders = exports.getOrderById = exports.getOrdersByUserId = exports.updateOrderStatus = exports.deleteOrders = exports.deleteOrder = exports.makeOrder = void 0;
const prisma_1 = require("../../utils/prisma");
const makeOrder = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, personId, senderName, message, phoneNumber } = req.body;
    try {
        const person = yield prisma_1.prisma.person.findFirst({
            where: {
                id: personId,
            },
        });
        const existingOrder = yield prisma_1.prisma.order.findFirst({
            where: { userId, personId },
        });
        if (existingOrder) {
            return reply.status(400).send({ message: "Заказ уже существует" });
        }
        yield prisma_1.prisma.order.create({
            data: {
                message,
                phoneNumber,
                senderName,
                userId,
                personId,
            },
        });
        reply.status(200).send({ message: "Заказ отправлен успешно" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка создания заказа" });
    }
});
exports.makeOrder = makeOrder;
const deleteOrder = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.prisma.order.delete({
            where: {
                id,
            },
        });
        reply.status(200).send({ message: "Заказ удален успешно" });
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteOrder = deleteOrder;
const deleteOrders = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.prisma.order.deleteMany();
        reply.status(200).send({ message: "Заказы успешно удалено" });
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteOrders = deleteOrders;
const updateOrderStatus = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { orderStatus } = req.body;
    try {
        yield prisma_1.prisma.order.update({
            where: {
                id,
            },
            data: {
                orderStatus,
            },
        });
        reply.status(200).send({ message: "Статус заказа изменен " });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при изменении статуса заказа" });
    }
});
exports.updateOrderStatus = updateOrderStatus;
const getOrdersByUserId = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const orders = yield prisma_1.prisma.order.findMany({
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
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при получении заказов" });
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
const getOrderById = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield prisma_1.prisma.order.findFirst({
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
        reply.status(200).send(order);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при получении заказов" });
    }
});
exports.getOrderById = getOrderById;
const getOrders = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield prisma_1.prisma.order.findMany();
        reply.status(200).send(orders);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при получении заказов" });
    }
});
exports.getOrders = getOrders;
const updateOrderRead = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { read } = req.body;
    const { id } = req.params;
    try {
        yield prisma_1.prisma.order.update({
            where: {
                id,
            },
            data: {
                read: true,
            },
        });
        reply.status(200).send({ message: "Read  успешно обновленно" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обновлении read" });
    }
});
exports.updateOrderRead = updateOrderRead;
