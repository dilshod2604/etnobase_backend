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
exports.getMe = exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../utils/prisma");
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
        const accessToken = req.server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "7d" });
        //refresh
        const refreshToken = req.server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "30d" });
        reply.setCookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });
        return reply.status(200).send({
            message: "Успешный вход",
            accessToken,
        });
    }
    catch (error) {
        console.error("Ошибка при входе:", error);
        return reply.status(500).send({ message: "Внутренняя ошибка сервера" });
    }
});
exports.signIn = signIn;
const getMe = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    console.log(userId);
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
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
