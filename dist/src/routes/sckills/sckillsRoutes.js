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
const sckillsController_1 = require("../../constrolers/person/sckillsController");
const personSckillsSchema_1 = require("../../schemas/person/sckills/personSckillsSchema");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/sckills", {
        schema: {
            body: (0, personSckillsSchema_1.$ref)("createPersonSckillsSchema"),
            response: {
                201: (0, personSckillsSchema_1.$ref)("personSckillsSchemaResponse"),
            },
        },
    }, sckillsController_1.createSckills);
    fastify.put("/sckills/:id", {
        schema: {
            params: (0, personSckillsSchema_1.$ref)("personSckillsParamsSchema"),
            body: (0, personSckillsSchema_1.$ref)("updatePersonSckillsSchema"),
            response: {
                200: (0, personSckillsSchema_1.$ref)("personSckillsSchemaResponse"),
            },
        },
    }, sckillsController_1.updateSckills);
    fastify.delete("/sckills/:id", {
        schema: {
            params: (0, personSckillsSchema_1.$ref)("personSckillsParamsSchema"),
            response: {
                200: (0, personSckillsSchema_1.$ref)("personSckillsSchemaResponse"),
            },
        },
    }, sckillsController_1.deleteSckills);
}));
