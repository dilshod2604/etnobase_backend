import nodemailer from "nodemailer";
import { resetPasswordTemplate } from "./resetPasswordTemplate";
export const sendEmail = async ({
  to,
  message,
}: {
  to: string;
  resipientName?: string;
  message: string;
}): Promise<string> => {
  const transporter = nodemailer.createTransport({
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
      address: process.env.USER!,
    },
    to,
    subject: "Сброс пароля",
    html: resetPasswordTemplate(message),
  };

  try {
    await transporter.sendMail(mailOptions);
    return "Сообщение успешно отправлено";
  } catch (error) {
    console.error("Ошибка при отправке email:", error);
    return "Ошибка при отправке сообщения";
  }
};
