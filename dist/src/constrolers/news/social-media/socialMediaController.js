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
exports.deleteSocialMedia = exports.addSocialMedia = void 0;
const prisma_1 = require("./../../../utils/prisma");
const addSocialMedia = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, link, newsId } = req.body;
    try {
        yield prisma_1.prisma.newsSocialmedia.create({
            data: {
                newsId,
                name,
                link,
            },
        });
        reply.status(201).send({ message: "Социальная сеть успешно добавлена" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка добавления социальной сети" });
    }
});
exports.addSocialMedia = addSocialMedia;
const deleteSocialMedia = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, newsId } = req.body;
    try {
        yield prisma_1.prisma.newsSocialmedia.delete({
            where: {
                id,
                newsId,
            },
        });
        reply.status(201).send({ message: "Социальная сеть успешно удалена" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка удаления социальной сети" });
    }
});
exports.deleteSocialMedia = deleteSocialMedia;
