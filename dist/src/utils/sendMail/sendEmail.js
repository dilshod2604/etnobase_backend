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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const resetPasswordTemplate_1 = require("./resetPasswordTemplate");
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, message, }) {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER,
            pass: process.env.APP_PASSWORD,
        },
    });
    const mailOptions = {
        from: {
            name: "Etnobasa",
            address: process.env.USER,
        },
        to,
        subject: "Сброс пароля",
        html: (0, resetPasswordTemplate_1.resetPasswordTemplate)(message),
    };
    try {
        yield transporter.sendMail(mailOptions);
        return "Сообщение успешно отправлено";
    }
    catch (error) {
        console.error("Ошибка при отправке email:", error);
        return "Ошибка при отправке сообщения";
    }
});
exports.sendEmail = sendEmail;
