"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const path_1 = __importDefault(require("path"));
const app = (0, fastify_1.default)({ logger: true });
app.register(autoload_1.default, {
    dir: path_1.default.join(__dirname, "plugins"),
});
app.get("/", (req, reply) => {
    reply.send({ message: "Hello from Fastify on Vercel!" });
}),
    app.register(autoload_1.default, {
        dir: path_1.default.join(__dirname, "routes"),
        // options: { prefix: "api/v1" },
    });
exports.default = app;
