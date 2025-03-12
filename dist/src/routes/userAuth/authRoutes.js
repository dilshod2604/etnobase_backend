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
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const AuthSchemas_1 = require("../../schemas/authScemas/AuthSchemas");
const userAuthController_1 = require("../../constrolers/auth/user/userAuthController");
const refreshAccessToken_1 = require("../../constrolers/auth/user/refreshAccessToken");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/sign-up", {
        schema: {
            body: (0, AuthSchemas_1.$ref)("signUpSchema"),
            response: {
                201: (0, AuthSchemas_1.$ref)("signUpUserResponse"),
            },
        },
    }, userAuthController_1.signUp);
    fastify.post("/sign-in", {
        schema: {
            body: (0, AuthSchemas_1.$ref)("singInUserSchema"),
            response: {
                200: (0, AuthSchemas_1.$ref)("signInUserResponse"),
            },
        },
    }, userAuthController_1.signIn);
    fastify.get("/user", {
        preHandler: [fastify.authJWT],
        schema: {
            response: {
                200: (0, AuthSchemas_1.$ref)("getUserResonse"),
            },
        },
    }, userAuthController_1.getMe);
    fastify.post("/refresh-token", {
        schema: {
            response: {
                200: (0, AuthSchemas_1.$ref)("refreshTockenResponse"),
            },
        },
    }, refreshAccessToken_1.refreshAccessToken);
}));
