"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.authSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const signUpSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Имя должно содержать хотя бы 2 символа").max(255),
    email: zod_1.z.string().email("Некорректный формат электронной почты"),
    password: zod_1.z
        .string()
        .min(8, "Пароль должен содержать хотя бы 8 символов")
        .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
        .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
        .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
        .regex(/[\W_]/, "Пароль должен содержать хотя бы один специальный символ"),
});
const singInUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const signInUserResponse = zod_1.z.object({
    message: zod_1.z.string(),
    accessToken: zod_1.z.string(),
});
const signUpUserResponse = zod_1.z.object({
    message: zod_1.z.string(),
    data: signUpSchema.omit({ password: true }).extend({
        id: zod_1.z.number(),
    }),
});
const getUserResonse = zod_1.z.object({
    id: zod_1.z.number(),
    email: zod_1.z.string(),
    name: zod_1.z.string(),
});
const refreshTockenResponse = zod_1.z.object({
    message: zod_1.z.string(),
    accessToken: zod_1.z.string(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    getUserResonse,
    singInUserSchema,
    signInUserResponse,
    signUpSchema,
    signUpUserResponse,
    refreshTockenResponse,
}, { $id: "Auth" }), exports.authSchema = _a.schemas, exports.$ref = _a.$ref;
