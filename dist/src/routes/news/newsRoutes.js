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
const socialMediaController_1 = require("../../constrolers/news/social-media/socialMediaController");
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
            // response: {
            //   200: $ref("newsResponse"),
            // },
        },
    }, newsController_1.fetchNewsById);
    fastify.get("/news", newsController_1.fetchNews);
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
    fastify.post("/news/like", {
        schema: {
            body: {
                type: "object",
                properties: {
                    newsId: { type: "number" },
                    reaction: { type: "string", enum: ["like", "dislike"] },
                    userId: { type: "number" },
                },
                required: ["newsId", "reaction", "userId"],
            },
            // response: {
            //   200: {
            //     type: "object",
            //     properties: {
            //       id: { type: "number" },
            //       likes: { type: "number" },
            //       dislikes: { type: "number" },
            //     },
            //   },
            // },
        },
    }, newsController_1.handleLikeDislikeNews);
    fastify.post("/news/views", {
        schema: {
            body: {
                type: "object",
                properties: {
                    newsId: { type: "number" },
                    userId: { type: "number" },
                },
                required: ["newsId", "userId"],
            },
        },
    }, newsController_1.newsViews);
    fastify.post("/news/social-media", {
        schema: {
            body: {
                type: "object",
                properties: {
                    newsId: { type: "number" },
                    name: { type: "string" },
                    link: { type: "string" },
                },
                required: ["newsId", "name", "link"],
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, socialMediaController_1.addSocialMedia);
    fastify.delete("/news/social-media/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" },
                },
                required: ["id"],
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    }, socialMediaController_1.deleteSocialMedia);
}));
