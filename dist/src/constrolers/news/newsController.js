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
exports.handleLikeDislikeNews = exports.fetchNewsById = exports.fetchNews = exports.deleteNews = exports.updateNews = exports.createNews = void 0;
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
        const news = yield prisma_1.prisma.news.findMany({
            include: {
                comments: true,
                newsLikes: true,
                newsViews: true,
            },
        });
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
const handleLikeDislikeNews = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, newsId, reaction } = req.body;
    try {
        const [user, news] = yield Promise.all([
            prisma_1.prisma.user.findFirst({ where: { id: userId } }),
            prisma_1.prisma.news.findFirst({ where: { id: newsId } }),
        ]);
        if (!user || !news) {
            return reply
                .status(404)
                .send({ message: "Пользователь или новость не найдены" });
        }
        yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const isLike = reaction === "like";
            const isDislike = reaction === "dislike";
            const existingNewsLike = yield prisma_1.prisma.newsLikes.findUnique({
                where: {
                    userId_newsId: {
                        userId,
                        newsId,
                    },
                },
            });
            let likesDelta = 0;
            let dislikesDelta = 0;
            if (existingNewsLike) {
                yield tx.newsLikes.delete({
                    where: {
                        userId_newsId: {
                            userId,
                            newsId,
                        },
                    },
                });
                if (existingNewsLike.isLike) {
                    likesDelta -= 1;
                }
                else {
                    dislikesDelta -= 1;
                }
            }
            if (!existingNewsLike || existingNewsLike.isLike !== isLike) {
                yield tx.newsLikes.create({
                    data: {
                        userId,
                        newsId,
                        isLike,
                        isDislike,
                    },
                });
                if (isLike) {
                    likesDelta += 1;
                }
                else if (isDislike) {
                    dislikesDelta += 1;
                }
            }
            yield tx.news.update({
                where: {
                    id: newsId,
                },
                data: {
                    likes: { increment: likesDelta },
                    dislikes: { increment: dislikesDelta },
                },
                // select: {
                //   id: true,
                //   likes: true,
                //   dislikes: true,
                // },
            });
            return reply.status(204).send();
        }));
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при лайк/дизлайк новости" });
    }
});
exports.handleLikeDislikeNews = handleLikeDislikeNews;
