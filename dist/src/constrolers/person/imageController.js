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
exports.deleteImage = exports.updateImage = exports.createImage = void 0;
const prisma_1 = require("../../utils/prisma");
const createImage = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { personId, urls } = req.body;
    try {
        if (!urls || urls.length === 0) {
            return reply.status(400).send({ message: "Нет загруженных изображений" });
        }
        const imageData = urls.map((url) => ({
            personId,
            src: url,
        }));
        const images = yield prisma_1.prisma.personImage.createMany({
            data: imageData,
        });
        reply.status(201).send(images);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при создании фото" });
    }
});
exports.createImage = createImage;
const updateImage = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const image = yield prisma_1.prisma.personImage.update({
            where: {
                id,
            },
            data,
        });
        reply.status(200).send(image);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обновлении фото" });
    }
});
exports.updateImage = updateImage;
const deleteImage = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const image = yield prisma_1.prisma.personImage.delete({
            where: {
                id,
            },
        });
        reply.status(200).send(image);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при удалении фото" });
    }
});
exports.deleteImage = deleteImage;
