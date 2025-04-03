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
exports.googleAuthController = googleAuthController;
const crypto_1 = require("crypto");
const prisma_1 = require("../../../utils/prisma");
const axios_1 = __importDefault(require("axios"));
function googleAuthController(req, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token } = yield req.server.googleOAuth.getAccessTokenFromAuthorizationCodeFlow(req);
            const userInfoResponse = yield axios_1.default.get("https://www.googleapis.com/oauth2/v2/userinfo", {
                headers: { Authorization: `Bearer ${token.access_token}` },
            });
            if (userInfoResponse.status !== 200) {
                throw new Error("Не удалось получить данные пользователя от Google");
            }
            const userInfo = userInfoResponse.data;
            let user = yield prisma_1.prisma.user.upsert({
                where: { email: userInfo.email },
                create: {
                    email: userInfo.email,
                    name: userInfo.name,
                    password: (0, crypto_1.randomUUID)(),
                    avatar: userInfo.picture,
                    provider: "google",
                },
                update: {
                    name: userInfo.name,
                    avatar: userInfo.picture,
                },
            });
            const accessToken = req.server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "5m" });
            const refreshToken = req.server.jwt.sign({ id: user.id, email: user.email }, { expiresIn: "30d" });
            reply.redirect(`${process.env.FRONTEND_URL}/auth/google/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
        }
        catch (error) {
            console.error(error);
            return reply.status(500).send({
                message: "Ошибка при аутентификации через Google",
                error,
            });
        }
    });
}
