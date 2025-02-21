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
exports.deleteAwards = exports.updateAwards = exports.createAwards = void 0;
const prisma_1 = require("../../utils/prisma");
const createAwards = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const awards = yield prisma_1.prisma.personAwards.create({
            data,
        });
        reply.status(201).send(awards);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при создании награду" });
    }
});
exports.createAwards = createAwards;
const updateAwards = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const awards = yield prisma_1.prisma.personAwards.update({
            where: {
                id,
            },
            data,
        });
        reply.status(200).send(awards);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при изменении награду" });
    }
});
exports.updateAwards = updateAwards;
const deleteAwards = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const awards = yield prisma_1.prisma.personAwards.delete({
            where: {
                id,
            },
        });
        reply.status(200).send(awards);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при удалении награду" });
    }
});
exports.deleteAwards = deleteAwards;
