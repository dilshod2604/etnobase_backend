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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = exports.uploadFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const stream_1 = require("stream");
const util_1 = require("util");
const crypto_1 = __importDefault(require("crypto"));
const pump = (0, util_1.promisify)(stream_1.pipeline);
const url = process.env.APP_URL;
const uploadFile = (_a) => __awaiter(void 0, [_a], void 0, function* ({ file, uploadPath }) {
    const dirname = path_1.default.resolve("public");
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
const uploadFiles = (_a) => __awaiter(void 0, [_a], void 0, function* ({ files, uploadPath, }) {
    var _b, files_1, files_1_1;
    var _c, e_1, _d, _e;
    const fileUrls = [];
    const dirname = path_1.default.resolve("public");
    try {
        try {
            for (_b = true, files_1 = __asyncValues(files); files_1_1 = yield files_1.next(), _c = files_1_1.done, !_c; _b = true) {
                _e = files_1_1.value;
                _b = false;
                let file = _e;
                if (!file) {
                    throw new Error("Файл не загружен");
                }
                const fileExt = path_1.default.extname(file.filename).slice(1) || "png";
                const allowedTypes = [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                    "image/webp",
                ];
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
                fileUrls.push(`${url}${uploadPath}/${fileName}`);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_b && !_c && (_d = files_1.return)) yield _d.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return fileUrls;
    }
    catch (error) {
        console.error(error);
        throw new Error(`Ошибка при загрузке файлов: ${error}`);
    }
});
exports.uploadFiles = uploadFiles;
