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
const personAwardsSchema_1 = require("../../schemas/person/awards/personAwardsSchema");
const awardsController_1 = require("../../constrolers/person/awardsController");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/awards", {
        schema: {
            body: (0, personAwardsSchema_1.$ref)("createPersonAwardsSchema"),
            response: {
                201: (0, personAwardsSchema_1.$ref)("personAwardsSchemaResponse"),
            },
        },
    }, awardsController_1.createAwards);
    fastify.put("/awards/:id", {
        schema: {
            params: (0, personAwardsSchema_1.$ref)("personAwardsParamsSchema"),
            body: (0, personAwardsSchema_1.$ref)("updatePersonAwardsSchema"),
            response: {
                200: (0, personAwardsSchema_1.$ref)("personAwardsSchemaResponse"),
            },
        },
    }, awardsController_1.updateAwards);
    fastify.delete("/awards/:id", {
        schema: {
            params: (0, personAwardsSchema_1.$ref)("personAwardsParamsSchema"),
            response: {
                200: (0, personAwardsSchema_1.$ref)("personAwardsSchemaResponse"),
            },
        },
    }, awardsController_1.deleteAwards);
}));
