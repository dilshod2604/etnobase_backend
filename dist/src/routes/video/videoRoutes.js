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
const personVideo_scema_1 = require("../../schemas/person/video/personVideo.scema");
const videoController_1 = require("../../constrolers/person/videoController");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/video", {
        schema: {
            body: (0, personVideo_scema_1.$ref)("createPersonVideoSchema"),
            response: {
                201: (0, personVideo_scema_1.$ref)("createPersonVideoResponse"),
            },
        },
    }, videoController_1.createVideo);
    fastify.put("/video/:id", {
        schema: {
            params: (0, personVideo_scema_1.$ref)("personVideoParamsSchema"),
            body: (0, personVideo_scema_1.$ref)("updatePersonVideoSchema"),
            response: {
                200: (0, personVideo_scema_1.$ref)("personVideoResponse"),
            },
        },
    }, videoController_1.updateVideo);
    fastify.delete("/video/:id", {
        schema: {
            params: (0, personVideo_scema_1.$ref)("personVideoParamsSchema"),
            response: {
                200: (0, personVideo_scema_1.$ref)("personVideoResponse"),
            },
        },
    }, videoController_1.deleteVideo);
}));
