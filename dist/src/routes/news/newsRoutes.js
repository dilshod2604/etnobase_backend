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
const newsController_1 = require("../../constrolers/news/newsController");
const newsSchema_1 = require("../../schemas/news/newsSchema");
const uploadAwatar_1 = require("../../constrolers/person/uploadAwatar");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/news", {
        schema: {
            body: (0, newsSchema_1.$ref)("createNewsSchema"),
            response: {
                201: (0, newsSchema_1.$ref)("newsResponse"),
            },
        },
    }, newsController_1.createNews);
    fastify.put("/news/:id", {
        schema: {
            body: (0, newsSchema_1.$ref)("updateNewsSchema"),
            response: {
                201: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, newsController_1.updateNews);
    fastify.delete("/news/:id", {
        schema: {
            response: {
                201: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, newsController_1.deleteNews);
    fastify.get("/news/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "string" },
                },
                required: ["id"],
            },
            response: {
                200: (0, newsSchema_1.$ref)("newsResponse"),
            },
        },
    }, newsController_1.fetchNewsById);
    fastify.get("/news", {
        schema: {
            response: {
                200: (0, newsSchema_1.$ref)("getAllNewsSchemas"),
            },
        },
    }, newsController_1.fetchNews);
    fastify.post("/news/poster", {
        schema: {
            response: {
                200: {
                    type: "object",
                    properties: {
                        url: { type: "string" },
                    },
                },
            },
        },
    }, uploadAwatar_1.uploadAwatar);
}));
