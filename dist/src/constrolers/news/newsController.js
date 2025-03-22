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
exports.fetchNewsById = exports.fetchNews = exports.deleteNews = exports.updateNews = exports.createNews = void 0;
const prisma_1 = require("../../utils/prisma");
const createNews = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const news = yield prisma_1.prisma.news.create({
            data,
        });
        reply.status(201).send(news);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка создания новости" });
    }
});
exports.createNews = createNews;
const updateNews = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    try {
        const news = yield prisma_1.prisma.news.update({
            where: { id: parseInt(id) },
            data,
        });
        if (!news) {
            reply.status(404).send({ message: "Новость не найдена" });
        }
        reply.status(200).send({ message: "Новости успешно обновлено" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка обновлении новости" });
    }
});
exports.updateNews = updateNews;
const deleteNews = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const news = yield prisma_1.prisma.news.delete({
            where: { id: parseInt(id) },
        });
        if (!news) {
            reply.status(404).send({ message: "Новость не найдена" });
        }
        reply.status(200).send({ message: "Новости успешно удалено" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка удалении новости" });
    }
});
exports.deleteNews = deleteNews;
const fetchNews = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield prisma_1.prisma.news.findMany();
        reply.status(200).send(news);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при получение новостей" });
    }
});
exports.fetchNews = fetchNews;
const fetchNewsById = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    47;
    const { id } = req.params;
    try {
        const news = yield prisma_1.prisma.news.findFirst({
            where: { id: parseInt(id) },
        });
        if (!news) {
            reply.status(404).send({ message: "Новость не найдена" });
        }
        reply.status(200).send(news);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при получение новостей" });
    }
});
exports.fetchNewsById = fetchNewsById;
