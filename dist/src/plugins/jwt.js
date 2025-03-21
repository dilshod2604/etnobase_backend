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
const jwt_1 = __importDefault(require("@fastify/jwt"));
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.register(jwt_1.default, {
        secret: process.env.JWT_SECRET || "supercodekey",
    });
    fastify.decorate("authJWT", (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield req.jwtVerify();
        }
        catch (error) {
            reply.status(401).send({ error: "Неавторизованный" });
        }
    }));
    //   fastify.addHook("onRequest", async (req, reply) => {
    //     if (req.url.startsWith("/public")) {
    //       return;
    //     }
    //     try {
    //       await req.jwtVerify();
    //     } catch (error) {
    //       reply.status(401).send({ error: "Unauthorized" });
    //     }
    //   });
}));
