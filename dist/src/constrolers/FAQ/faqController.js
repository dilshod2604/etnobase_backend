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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFAQ = exports.deleteFAQ = exports.updateFAQ = exports.createFAQ = void 0;
const prisma_1 = require("../../utils/prisma");
const createFAQ = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        yield prisma_1.prisma.fAQ.create({
            data: data,
        });
        reply.status(201).send({ message: "FAQ успешно создалось" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при создании нового FAQ" });
    }
});
exports.createFAQ = createFAQ;
const updateFAQ = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    try {
        yield prisma_1.prisma.fAQ.update({
            where: {
                id,
            },
            data: data,
        });
        reply.status(200).send({ message: "FAQ успешно обновлено" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обновлении FAQ" });
    }
});
exports.updateFAQ = updateFAQ;
const deleteFAQ = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.prisma.fAQ.delete({
            where: {
                id,
            },
        });
        reply.status(201).send({ message: "FAQ успешно обновлено" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при удалении FAQ" });
    }
});
exports.deleteFAQ = deleteFAQ;
const fetchFAQ = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faq = yield prisma_1.prisma.fAQ.findMany();
        reply.status(201).send(faq);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при получении FAQ" });
    }
});
exports.fetchFAQ = fetchFAQ;
