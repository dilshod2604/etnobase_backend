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
exports.fetchCommentReply = exports.likeDislikeCommmentReply = exports.deleteCommentReply = exports.addCommentReply = void 0;
const prisma_1 = require("../../../utils/prisma");
const addCommentReply = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, userId, text } = req.body;
    try {
        yield prisma_1.prisma.commentReply.create({
            data: {
                commentId,
                userId,
                text,
            },
        });
        reply.status(201).send({ message: "Комментарий ответа успешно добавлен" });
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Ошибка при создании комментария ответа" });
    }
});
exports.addCommentReply = addCommentReply;
const deleteCommentReply = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, userId } = req.body;
    try {
        yield prisma_1.prisma.commentReply.delete({
            where: {
                id: commentId,
                userId,
            },
        });
        reply.status(200).send({ message: "Комментарий успешно удален" });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при удалении комментария" });
    }
});
exports.deleteCommentReply = deleteCommentReply;
const likeDislikeCommmentReply = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, userId, reaction } = req.body;
    try {
        const [user, comment] = yield Promise.all([
            prisma_1.prisma.user.findUnique({ where: { id: userId } }),
            prisma_1.prisma.commentReply.findUnique({ where: { id: commentId } }),
        ]);
        if (!user || !comment) {
            return reply
                .status(404)
                .send({ message: "Пользователь или комментарий ответа не найдены" });
        }
        const likeExists = yield prisma_1.prisma.newsCommentLike.findUnique({
            where: {
                user_reply_unique: {
                    userId,
                    replyId: commentId,
                },
            },
        });
        const isLike = reaction === "like";
        const isDislike = reaction === "dislike";
        let likesDelta = 0;
        let dislikesDelta = 0;
        if (likeExists) {
            yield prisma_1.prisma.newsCommentLike.delete({
                where: {
                    user_reply_unique: {
                        userId,
                        replyId: commentId,
                    },
                },
            });
            if (likeExists.isLike) {
                likesDelta -= 1;
            }
            else {
                dislikesDelta -= 1;
            }
        }
        if (!likeExists || likeExists.isLike !== isLike) {
            yield prisma_1.prisma.newsCommentLike.create({
                data: {
                    userId,
                    replyId: commentId,
                    isLike,
                    isDislike,
                },
            });
            if (isLike) {
                likesDelta += 1;
            }
            else {
                dislikesDelta += 1;
            }
        }
        yield prisma_1.prisma.commentReply.update({
            where: {
                id: commentId,
            },
            data: {
                likes: { increment: likesDelta },
                dislikes: { increment: dislikesDelta },
            },
        });
        reply.status(204).send();
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Ошибка при лайк/дизлайк комментария ответа" });
    }
});
exports.likeDislikeCommmentReply = likeDislikeCommmentReply;
const fetchCommentReply = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, userId } = req.params;
    try {
        const commentReply = yield prisma_1.prisma.newsComment.findMany({
            where: {
                id: commentId,
            },
            include: {
                replies: {
                    include: {
                        newsReplyLikes: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        reply.status(200).send(commentReply);
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Ошибка при получении всех комментариев ответов" });
    }
});
exports.fetchCommentReply = fetchCommentReply;
