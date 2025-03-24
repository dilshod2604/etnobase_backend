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
const favoritesController_1 = require("../../constrolers/user/favorites/favoritesController");
const userFavoritesSchema_1 = require("../../schemas/user/favorites/userFavoritesSchema");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/favorites/add", {
        schema: {
            body: (0, userFavoritesSchema_1.$ref)("userFavoritesSchema"),
            response: {
                201: (0, userFavoritesSchema_1.$ref)("userFavoritesResponseSchema"),
            },
        },
    }, favoritesController_1.addFavorites);
    fastify.delete("/favorites/remove", {
        schema: {
            body: (0, userFavoritesSchema_1.$ref)("userFavoritesSchema"),
            response: {
                200: (0, userFavoritesSchema_1.$ref)("userFavoritesResponseSchema"),
            },
        },
    }, favoritesController_1.removeFavorites);
    fastify.delete("/favorites/remove-all", {
        schema: {
            body: (0, userFavoritesSchema_1.$ref)("deleteAllFavoritesSchema"),
            response: {
                200: (0, userFavoritesSchema_1.$ref)("userFavoritesResponseSchema"),
            },
        },
    }, favoritesController_1.removeAllFavorites);
    fastify.get("/favorites/:userId", {
        schema: {
            response: {
                200: (0, userFavoritesSchema_1.$ref)("getUserFavoritesPersonsSchema"),
            },
        },
    }, favoritesController_1.getFavorites);
}));
