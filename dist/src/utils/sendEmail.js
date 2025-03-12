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
const sendEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ from, to, message, }) {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-email-password",
        },
    });
    const mailOptions = {
        from: from,
        to: to,
        subject: "Сброс пароля",
        text: `Ваш код для сброса пароля: ${message}. Код действителен в течение 10 минут.`,
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
