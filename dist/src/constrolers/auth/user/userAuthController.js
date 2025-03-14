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
exports.resetPassword = exports.verifyResetCode = exports.forgotPassword = exports.editMe = exports.getMe = exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../utils/prisma");
const sendEmail_1 = require("../../../utils/sendMail/sendEmail");
const signUp = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return reply
                .status(400)
                .send({ message: "Пользователь с таким email уже существует" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        reply
            .status(201)
            .send({ message: "Пользователь успешно зарегистрировался", data: user });
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Ошибка регисрации пользователя", error });
    }
});
exports.signUp = signUp;
const signIn = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return reply
                .status(404)
                .send({ message: "Пользователь не найден с таким email" });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return reply.status(400).send({ message: "Неверный пароль" });
        }
        //accessToken
        const accessToken = req.server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "5m" });
        // refresh
        const refreshToken = req.server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "30d" });
        return reply.status(200).send({
            message: "Успешный вход",
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Ошибка при входе:", error);
        return reply.status(500).send({ message: "Внутрення ошибка сервера" });
    }
});
exports.signIn = signIn;
const getMe = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
        if (!user) {
            return reply.status(404).send({ message: "Пользователь не найден" });
        }
        reply.status(200).send(user);
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Ошибка получения информации о пользователе" });
    }
});
exports.getMe = getMe;
const editMe = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, email, name } = req.body;
    try {
        const updateUser = yield prisma_1.prisma.user.update({
            where: {
                id,
            },
            data: {
                email,
                name,
            },
        });
        if (!updateUser) {
            return reply.status(404).send({ message: "Пользователь не найден" });
        }
        reply.status(200).send({ message: "Пользователь успешно изменен" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обновлении пользователе" });
    }
});
exports.editMe = editMe;
const forgotPassword = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user) {
        return reply.status(404).send({ message: "Пользователь не найден" });
    }
    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    yield prisma_1.prisma.passwordResetCode.upsert({
        where: { email },
        update: { code: resetCode, expiresAt },
        create: { email, code: resetCode, expiresAt },
    });
    const result = yield (0, sendEmail_1.sendEmail)({
        to: email,
        message: resetCode,
    });
    return reply.send({ message: result });
});
exports.forgotPassword = forgotPassword;
const verifyResetCode = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const resetEntry = yield prisma_1.prisma.passwordResetCode.findFirst({
        where: { code, expiresAt: { gt: new Date() } },
    });
    if (!resetEntry) {
        return reply.status(400).send({ message: "Неверный или просроченный код" });
    }
    return reply.send({ message: "Код подтверждён" });
});
exports.verifyResetCode = verifyResetCode;
const resetPassword = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    const resetEntry = yield prisma_1.prisma.passwordResetCode.findFirst({
        where: { email, expiresAt: { gt: new Date() } },
    });
    if (!resetEntry) {
        return reply.status(400).send({ message: "Неверный или просроченный код" });
    }
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield prisma_1.prisma.user.update({
        where: { email: resetEntry.email },
        data: { password: hashedPassword },
    });
    yield prisma_1.prisma.passwordResetCode.delete({ where: { email: resetEntry.email } });
    return reply.send({ message: "Пароль успешно изменён" });
});
exports.resetPassword = resetPassword;
