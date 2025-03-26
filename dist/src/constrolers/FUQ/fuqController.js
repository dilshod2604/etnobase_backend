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
exports.fetchFUQ = exports.deleteFUQ = exports.updateFUQ = exports.createFUQ = void 0;
const prisma_1 = require("../../utils/prisma");
const createFUQ = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const fuq = yield prisma_1.prisma.fUQ.create({
            data: data,
        });
        reply.status(201).send({ message: "FUQ успешно создалось" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при создании нового FUQ" });
    }
});
exports.createFUQ = createFUQ;
const updateFUQ = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    try {
        const fuq = yield prisma_1.prisma.fUQ.update({
            where: {
                id,
            },
            data: data,
        });
        reply.status(200).send({ message: "FUQ успешно обновлено" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обновлении FUQ" });
    }
});
exports.updateFUQ = updateFUQ;
const deleteFUQ = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const fuq = yield prisma_1.prisma.fUQ.delete({
            where: {
                id,
            },
        });
        reply.status(201).send({ message: "FUQ успешно обновлено" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при удалении FUQ" });
    }
});
exports.deleteFUQ = deleteFUQ;
const fetchFUQ = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fuq = yield prisma_1.prisma.fUQ.findMany();
        reply.status(201).send(fuq);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при получении FUQ" });
    }
});
exports.fetchFUQ = fetchFUQ;
