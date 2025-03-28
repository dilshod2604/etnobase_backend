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
exports.getFavorites = exports.removeAllFavorites = exports.removeFavorites = exports.addFavorites = void 0;
const prisma_1 = require("../../../utils/prisma");
//checkFavoriteExists
const checkFavoriteExists = (userId, personId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.prisma.favorites.findFirst({ where: { userId, personId } });
});
const addFavorites = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, personId } = req.body;
    try {
        const existingFavorites = yield checkFavoriteExists(userId, personId);
        if (existingFavorites) {
            return reply.status(400).send({
                message: "Такой персонаж  уже есть в избранном",
            });
        }
        yield prisma_1.prisma.favorites.create({
            data: { personId, userId, isFavorite: true },
        });
        return reply.status(201).send({ message: "Добавлено в избранное" });
    }
    catch (error) {
        console.error("Ошибка при добавлении в избранное:", error);
        return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
    }
});
exports.addFavorites = addFavorites;
const removeFavorites = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, personId } = req.body;
    try {
        const existingFavorites = yield checkFavoriteExists(userId, personId);
        if (!existingFavorites) {
            return reply.status(404).send({
                message: "Такой персонаж не найдена в избранном",
            });
        }
        yield prisma_1.prisma.favorites.delete({
            where: { userId_personId: { personId, userId } },
        });
        return reply.status(200).send({ message: "Удалено из избранного" });
    }
    catch (error) {
        console.error("Ошибка при удалении из избранного:", error);
        return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
    }
});
exports.removeFavorites = removeFavorites;
const removeAllFavorites = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const { count } = yield prisma_1.prisma.favorites.deleteMany({
            where: { userId },
        });
        if (count === 0) {
            return reply.status(404).send({
                message: "У пользователя нет избранного",
            });
        }
        return reply.status(200).send({ message: "Все избранные удалены" });
    }
    catch (error) {
        console.error("Ошибка при удалении избранного:", error);
        return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
    }
});
exports.removeAllFavorites = removeAllFavorites;
const getFavorites = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const user = yield prisma_1.prisma.user.findFirst({ where: { id: userId } });
        if (!user) {
            return reply.status(404).send({ message: "Пользователь не найден" });
        }
        const favorites = yield prisma_1.prisma.favorites.findMany({
            where: { userId },
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
        return reply.status(200).send(favorites);
    }
    catch (error) {
        console.error("Ошибка при получении избранного:", error);
        return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
    }
});
exports.getFavorites = getFavorites;
