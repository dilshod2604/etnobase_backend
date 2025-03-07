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
exports.deleteVideo = exports.updateVideo = exports.createVideo = void 0;
const prisma_1 = require("../../utils/prisma");
const createVideo = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { personId, urls } = req.body;
    try {
        if (!urls || urls.length === 0) {
            return reply.status(400).send({ message: "Нет загруженных видео" });
        }
        const videoData = urls.map((url) => ({
            personId,
            src: url,
        }));
        yield prisma_1.prisma.personVideo.createMany({
            data: videoData,
        });
        reply.status(201).send({ message: "Видео создалось успешно" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при создании видео" });
    }
});
exports.createVideo = createVideo;
const updateVideo = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const video = yield prisma_1.prisma.personVideo.update({
            where: {
                id,
            },
            data,
        });
        reply.status(200).send(video);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обновлении видео" });
    }
});
exports.updateVideo = updateVideo;
const deleteVideo = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const video = yield prisma_1.prisma.personVideo.delete({
            where: {
                id,
            },
        });
        reply.status(200).send(video);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при удалении видео" });
    }
});
exports.deleteVideo = deleteVideo;
