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
const personSchema_1 = require("../../schemas/person/personSchema");
const personControllers_1 = require("../../constrolers/person/personControllers");
const searchPersonsController_1 = require("../../constrolers/person/srearch_person/searchPersonsController");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/persons", {
        schema: {
            body: (0, personSchema_1.$ref)("createPersonSchema"),
            response: {
                201: (0, personSchema_1.$ref)("personResponseSchema"),
            },
        },
    }, personControllers_1.createPerson);
    fastify.get("/persons", {
        schema: {
            response: {
                200: (0, personSchema_1.$ref)("personsResponseSchema"),
            },
        },
    }, personControllers_1.fetchPersons);
    fastify.get("/persons/:id", {
        schema: {
            params: (0, personSchema_1.$ref)("personParamsSchema"),
            response: {
                200: (0, personSchema_1.$ref)("onePersonResponseSchema"),
            },
        },
    }, personControllers_1.fetchPersonById);
    fastify.put("/persons/:id", {
        schema: {
            params: (0, personSchema_1.$ref)("personParamsSchema"),
            response: {
                200: (0, personSchema_1.$ref)("personResponseSchema"),
            },
        },
    }, personControllers_1.updatePerson);
    fastify.delete("/persons/:id", {
        schema: {
            params: (0, personSchema_1.$ref)("personParamsSchema"),
            response: {
                204: (0, personSchema_1.$ref)("personResponseSchema"),
            },
        },
    }, personControllers_1.deletePerson);
    fastify.get("/persons/search", {
        schema: {
            response: {
                200: (0, personSchema_1.$ref)("personsResponseSchema"),
            },
        },
    }, searchPersonsController_1.searchPerson);
}));
