import path from "path";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import crypto from "crypto";

const pump = promisify(pipeline);
const url = process.env.APP_URL || "http://localhost:8000";

export const uploadFile = async (file: any, uploadPath: string) => {
  try {
    if (!file) {
      throw new Error("Файл не загружен");
    }

    const fileExt = path.extname(file.filename).slice(1) || "png";

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Недопустимый тип файла");
    }

    const randomString = crypto.randomBytes(8).toString("hex");
    const fileName = `image_${Date.now()}_${randomString}.${fileExt}`;
    const fileSavePath = path.join(uploadPath, fileName);

    const dir = path.dirname(fileSavePath);
    if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await pump(file.file, fs.createWriteStream(fileSavePath));

    const relativePath = path
      .relative(path.resolve("public"), fileSavePath)
      .replace(/\\/g, "/");

    return `${url}/${relativePath}`;
  } catch (error) {
    console.error(error);
    throw new Error(`Ошибка при загрузке файла: ${error}`);
  }
};
