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
exports.deleteComment = exports.fetchNewsComments = exports.fetchAllComments = exports.handleLikeDislike = exports.addComment = void 0;
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
const handleLikeDislike = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, reaction, userId } = req.body;
    try {
        const [user, comment] = yield Promise.all([
            prisma_1.prisma.user.findUnique({ where: { id: userId } }),
            prisma_1.prisma.newsComment.findUnique({ where: { id } }),
        ]);
        if (!user || !comment) {
            return reply.status(404).send({ message: "Пользователь или комментарий не найден" });
        }
        const isLike = reaction === "like";
        const isDislike = reaction === "dislike";
        if (!isLike && !isDislike) {
            return reply.badRequest("Некорректная реакция");
        }
        const existReaction = yield prisma_1.prisma.newsCommentLike.findUnique({
            where: { userId_commentId: { userId, commentId: id } },
        });
        yield prisma_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            if (existReaction) {
                yield tx.newsCommentLike.delete({
                    where: { userId_commentId: { userId, commentId: id } },
                });
                yield tx.newsComment.update({
                    where: { id },
                    data: {
                        likes: { decrement: existReaction.isLike ? 1 : 0 },
                        dislikes: { decrement: existReaction.isLike ? 0 : 1 },
                    },
                });
                if (existReaction.isLike !== isLike) {
                    yield tx.newsCommentLike.create({
                        data: { userId, commentId: id, isLike },
                    });
                    yield tx.newsComment.update({
                        where: { id },
                        data: {
                            likes: { increment: isLike ? 1 : 0 },
                            dislikes: { increment: isLike ? 0 : 1 },
                        },
                    });
                }
            }
            else {
                yield tx.newsCommentLike.create({
                    data: { userId, commentId: id, isLike },
                });
                yield tx.newsComment.update({
                    where: { id },
                    data: {
                        likes: { increment: isLike ? 1 : 0 },
                        dislikes: { increment: isLike ? 0 : 1 },
                    },
                });
            }
        }));
        return reply.status(204).send();
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обработке реакции" });
    }
});
exports.handleLikeDislike = handleLikeDislike;
const fetchAllComments = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield prisma_1.prisma.newsComment.findMany({
            include: {
                newsCommentLike: {
                    select: {
                        isLike: true,
                    },
                },
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
        if (comments.length === 0) {
            return reply.status(404).send({ message: "Коментарии не найдены" });
        }
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
const deleteComment = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId } = req.params;
    try {
        yield prisma_1.prisma.newsComment.delete({
            where: {
                id,
                userId,
            },
        });
        reply.status(204).send({ message: "Коментария успешно удалено" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при удалении коментария" });
    }
});
exports.deleteComment = deleteComment;
