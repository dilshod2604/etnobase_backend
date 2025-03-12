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
exports.refreshAccessToken = void 0;
const prisma_1 = require("../../../utils/prisma");
const refreshAccessToken = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) {
            return reply.status(400).send({ message: "Отсутствует refreshToken" });
        }
        const decoded = yield req.server.jwt.verify(refreshToken);
        const user = yield prisma_1.prisma.user.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return reply.status(404).send({ message: "Пользователь не найден" });
        }
        const newAccessToken = req.server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "5m" });
        return reply.status(200).send({
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        console.error("Ошибка при обновлении токена:", error);
        return reply
            .status(500)
            .send({ message: "Ошибка сервера при обновлении токена" });
    }
});
exports.refreshAccessToken = refreshAccessToken;
