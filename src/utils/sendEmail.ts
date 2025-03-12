import nodemailer from "nodemailer";

export const sendEmail = async ({
  from,
  to,
  message,
}: {
  from: string;
  to: string;
  message: string;
}): Promise<string> => {
  const transporter = nodemailer.createTransport({
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
    await transporter.sendMail(mailOptions);
    return "Сообщение успешно отправлено";
  } catch (error) {
    console.error("Ошибка при отправке email:", error);
    return "Ошибка при отправке сообщения";
  }
};
