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
exports.fetchNewsComments = exports.fetchAllComments = exports.disLikeComments = exports.likeComment = exports.addComment = void 0;
const prisma_1 = require("../../utils/prisma");
const addComment = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { newsId, text, userId } = req.body;
    try {
        yield prisma_1.prisma.newsComment.create({
            data: {
                newsId,
                text,
                userId,
            },
        });
        reply.status(201).send({ message: "Коментария успешно добавлено" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при добавлении коментария" });
    }
});
exports.addComment = addComment;
const likeComment = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, reaction, userId } = req.params;
    const isLike = reaction === "like";
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            where: { id: userId },
        });
        if (!user) {
            return reply.status(404).send({ message: "Пользователь не найден" });
        }
        const existLike = yield prisma_1.prisma.newsCommentLike.findUnique({
            where: {
                userId_commentId: {
                    commentId: id,
                    userId,
                },
            },
        });
        if (existLike && existLike.isLike === isLike) {
            return reply.badRequest("Вы уже лайкнули");
        }
        yield prisma_1.prisma.newsCommentLike.upsert({
            where: {
                userId_commentId: {
                    userId,
                    commentId: id,
                },
            },
            update: {
                isLike,
            },
            create: {
                userId,
                commentId: id,
                isLike,
            },
        });
        if (existLike) {
            if (isLike) {
                yield prisma_1.prisma.$executeRaw `UPDATE comments SET dislikes = dislikes - 1, likes = likes + 1  WHERE id = ${id}`;
            }
            else {
                yield prisma_1.prisma.$executeRaw `UPDATE comments SET dislikes = dislikes + 1, likes = likes - 1  WHERE id = ${id}`;
            }
        }
        else {
            if (isLike) {
                yield prisma_1.prisma.$executeRaw `UPDATE comments SET likes = likes + 1  WHERE id = ${id}`;
            }
            else {
                yield prisma_1.prisma.$executeRaw `UPDATE comments SET dislikes = dislikes + 1 WHERE id = ${id}`;
            }
        }
        return reply.status(204).send();
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при лайки коментария" });
    }
});
exports.likeComment = likeComment;
const disLikeComments = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, reaction, userId } = req.params;
    const isDislike = reaction === "dislike";
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            where: { id: userId },
        });
        if (!user) {
            return reply.status(404).send({ message: "Пользователь не найден" });
        }
        yield prisma_1.prisma.newsCommentLike
            .delete({
            where: { userId_commentId: { userId, commentId: id } },
        })
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            let result = null;
            if (isDislike) {
                result =
                    yield prisma_1.prisma.$executeRaw `UPDATE comments SET dislikes = dislikes - 1 WHERE id = ${id}`;
            }
            else {
                result =
                    yield prisma_1.prisma.$executeRaw `UPDATE comments SET likes = likes - 1 WHERE id = ${id}`;
            }
            return reply.status(result > 0 ? 200 : 404).send();
        }));
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при дизлайки коментария" });
    }
});
exports.disLikeComments = disLikeComments;
const fetchAllComments = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield prisma_1.prisma.newsComment.findMany({
            include: {
                user: true,
            },
        });
        reply.status(200).send(comments);
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchAllComments = fetchAllComments;
const fetchNewsComments = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { newsId } = req.params;
    try {
        const comments = yield prisma_1.prisma.newsComment.findMany({
            where: {
                newsId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        avatar: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });
        reply.status(200).send(comments);
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchNewsComments = fetchNewsComments;
