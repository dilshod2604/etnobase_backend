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
exports.uploadAwatar = void 0;
const uploadFile_1 = require("../../utils/uploadFile");
const uploadAwatar = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = yield req.file();
        if (!file) {
            return reply.status(400).send({ message: "Файл не загружен" });
        }
        const fileUrl = yield (0, uploadFile_1.uploadFile)({ file, uploadPath: "/images/avatars" });
        reply.status(200).send({ url: fileUrl });
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при загрузке файла", error });
    }
});
exports.uploadAwatar = uploadAwatar;
