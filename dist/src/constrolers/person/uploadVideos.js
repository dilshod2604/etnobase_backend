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
exports.uploadVideos = void 0;
const uploadFile_1 = require("../../utils/uploadFile");
const uploadVideos = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield req.files();
        if (!files) {
            return reply.status(400).send({ message: "Файлы не загружены" });
        }
        const fileUrls = yield (0, uploadFile_1.uploadFiles)({
            files,
            uploadPath: "/videos/personVideos",
            type: "video",
        });
        reply.status(200).send({
            message: "Файлы успешно загруженно",
            urls: fileUrls,
        });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при загрузке файлаов", error });
    }
});
exports.uploadVideos = uploadVideos;
