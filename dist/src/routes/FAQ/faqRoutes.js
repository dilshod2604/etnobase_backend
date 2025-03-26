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
const faqController_1 = require("../../constrolers/FAQ/faqController");
const faqSchema_1 = require("../../schemas/FAQ/faqSchema");
exports.default = (0, fastify_plugin_1.default)((fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/faq", {
        schema: {
            body: (0, faqSchema_1.$ref)("createFAQSchema"),
            response: {
                200: (0, faqSchema_1.$ref)("faqResponseSchema"),
            },
        },
    }, faqController_1.createFAQ);
    fastify.put("/faq/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" },
                },
                required: ["id"],
            },
            response: {
                200: (0, faqSchema_1.$ref)("faqResponseSchema"),
            },
        },
    }, faqController_1.updateFAQ);
    fastify.delete("/fuq/:id", {
        schema: {
            params: {
                type: "object",
                properties: {
                    id: { type: "number" },
                },
                required: ["id"],
            },
            response: {
                200: (0, faqSchema_1.$ref)("faqResponseSchema"),
            },
        },
    }, faqController_1.deleteFAQ);
    fastify.get("/faq", {
        schema: {
            response: {
                200: (0, faqSchema_1.$ref)("fetchAllFAQSchemas"),
            },
        },
    }, faqController_1.fetchFAQ);
}));
