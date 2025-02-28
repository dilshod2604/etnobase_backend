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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
const util_1 = require("util");
const crypto_1 = __importDefault(require("crypto"));
const pump = (0, util_1.promisify)(stream_1.pipeline);
const url = process.env.APP_URL;
const uploadFile = (_a) => __awaiter(void 0, [_a], void 0, function* ({ file, uploadPath, }) {
    console.log("APP_URL", url);
    const dirname = path_1.default.join(__dirname, "../../", "public");
    try {
        if (!file) {
            throw new Error("Файл не загружен");
        }
        const fileExt = path_1.default.extname(file.filename).slice(1) || "png";
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error("Недопустимый тип файла");
        }
        const randomString = crypto_1.default.randomBytes(8).toString("hex");
        const fileName = `image_${Date.now()}_${randomString}.${fileExt}`;
        const fileSavePath = path_1.default.join(`${dirname}${uploadPath}`, fileName);
        const dir = path_1.default.dirname(fileSavePath);
        if (!fs_1.default.existsSync(dir) || !fs_1.default.lstatSync(dir).isDirectory()) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        yield pump(file.file, fs_1.default.createWriteStream(fileSavePath));
        const fileUrl = `${url}${uploadPath}/${fileName}`;
        return fileUrl;
    }
    catch (error) {
        console.error(error);
        throw new Error(`Ошибка при загрузке файла: ${error}`);
    }
});
exports.uploadFile = uploadFile;
