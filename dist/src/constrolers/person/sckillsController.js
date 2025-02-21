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
exports.deleteSckills = exports.updateSckills = exports.createSckills = void 0;
const prisma_1 = require("../../utils/prisma");
const createSckills = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const sckills = yield prisma_1.prisma.personSckills.create({
            data,
        });
        reply.status(201).send(sckills);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при создании навыка" });
    }
});
exports.createSckills = createSckills;
const updateSckills = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const sckills = yield prisma_1.prisma.personSckills.update({
            where: {
                id,
            },
            data,
        });
        reply.status(200).send(sckills);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при изменении навыка" });
    }
});
exports.updateSckills = updateSckills;
const deleteSckills = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const sckills = yield prisma_1.prisma.personSckills.delete({
            where: {
                id,
            },
        });
        reply.status(200).send(sckills);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при удалении навыка" });
    }
});
exports.deleteSckills = deleteSckills;
