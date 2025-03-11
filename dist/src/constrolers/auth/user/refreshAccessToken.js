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
    try {
        const refreshToken = req.cookies.refresh_token;
        console.log("refreshToken", refreshToken);
        if (!refreshToken) {
            return reply.status(401).send({ message: "Токен отсутствует" });
        }
        const decoded = req.server.jwt.verify(refreshToken);
        const user = yield prisma_1.prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return reply.status(404).send({ message: "Пользователь не найден" });
        }
        const newAccessToken = req.server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "7d" });
        reply.send({
            message: "AccessToken обновлён",
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        console.error(error);
        reply.status(403).send({ message: "Недействительный refresh токен" });
    }
});
exports.refreshAccessToken = refreshAccessToken;
