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
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const personSchema_1 = require("../schemas/person/personSchema");
const personFilmography_schema_1 = require("../schemas/person/filmography/personFilmography.schema");
const personImage_1 = require("../schemas/person/image/personImage");
const personVideo_scema_1 = require("../schemas/person/video/personVideo.scema");
const personSckillsSchema_1 = require("../schemas/person/sckills/personSckillsSchema");
const personAwardsSchema_1 = require("../schemas/person/awards/personAwardsSchema");
const personTheatreSchema_1 = require("../schemas/person/theatre/personTheatreSchema");
const personsAvatarSchema_1 = require("../schemas/person/avatars/personsAvatarSchema");
const uploadPersonImageSchema_1 = require("../schemas/person/image/uploadPersonImageSchema");
const uploadPersonVideosSchema_1 = require("../schemas/person/video/uploadPersonVideosSchema");
const AuthSchemas_1 = require("../schemas/authScemas/AuthSchemas");
const userAvatarSchema_1 = require("../schemas/user/avatars/userAvatarSchema");
const userFavoritesSchema_1 = require("../schemas/user/favorites/userFavoritesSchema");
const newsSchema_1 = require("../schemas/news/newsSchema");
const faqSchema_1 = require("../schemas/FAQ/faqSchema");
const orderSchema_1 = require("../schemas/order/orderSchema");
const commentSchema_1 = require("../schemas/comment/commentSchema");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    const schemas = [
        ...personSchema_1.personSchema,
        ...personFilmography_schema_1.filmographySchema,
        ...personImage_1.PersonImageScheme,
        ...personVideo_scema_1.PersonVideoScheme,
        ...personSckillsSchema_1.PersonsSckillsSchema,
        ...personAwardsSchema_1.PersonsAwardsSchema,
        ...personTheatreSchema_1.PersonsTheatreSchema,
        ...personsAvatarSchema_1.PersonAvatarSchema,
        ...uploadPersonImageSchema_1.uploadPersonImageSchema,
        ...uploadPersonVideosSchema_1.uploadPersonVideosSchema,
        ...AuthSchemas_1.authSchema,
        ...userAvatarSchema_1.UserAvatarSchema,
        ...userFavoritesSchema_1.UserFavoritesSchema,
        ...newsSchema_1.NewsSchema,
        ...faqSchema_1.FAQSchema,
        ...orderSchema_1.OrderSchema,
        ...commentSchema_1.CommentSchema,
    ];
    schemas.forEach((schema) => {
        if (!fastify.getSchema(schema.$id)) {
            fastify.addSchema(schema);
        }
    });
    const swaggerOptions = {
        swagger: {
            info: {
                title: "Fastify auth API",
                description: "API документация вашего сервера",
                version: "1.0.0",
            },
            host: "localhost:8000",
            basePath: "/",
            tags: [
                { name: "etno_base", description: "Документация API routes etno_base" },
            ],
        },
    };
    fastify.register(swagger_1.default, swaggerOptions);
    fastify.register(swagger_ui_1.default, {
        routePrefix: "/docs",
        uiConfig: { docExpansion: "none", deepLinking: false },
        staticCSP: true,
        transformStaticCSP: (header) => header,
    });
}));
