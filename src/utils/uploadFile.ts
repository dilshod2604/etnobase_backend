import path from "path";

import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import crypto from "crypto";

const pump = promisify(pipeline);
const url = process.env.APP_URL;
interface uploadFileProps {
  file: any;
  uploadPath: string;
}

const ALLOWED_FILE_TYPES = {
  video: ["video/mp4", "video/webm", "video/ogg", "video/quicktime"],
  image: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
};


type FileType = "image" | "video";

export const uploadFile = async ({ file, uploadPath }: uploadFileProps) => {
  const dirname = path.join(__dirname, "../../", "public");
  try {
    if (!file) {
      throw new Error("Файл не загружен");
    }

    const fileExt = path.extname(file.filename);
    if (!fileExt) {
      throw new Error("Файл не имеет расширения");
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Недопустимый тип файла");
    }

    const randomString = crypto.randomBytes(8).toString("hex");
    const fileName = `image_${Date.now()}_${randomString}.${fileExt}`;
    const fileSavePath = path.join(`${dirname}${uploadPath}`, fileName);

    const dir = path.dirname(fileSavePath);
    if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await pump(file.file, fs.createWriteStream(fileSavePath));
    const fileUrl = `${url}${uploadPath}/${fileName}`;
    return fileUrl;
  } catch (error) {
    console.error(error);
    throw new Error(`Ошибка при загрузке файла: ${error}`);
  }
};

export const uploadFiles = async ({
  files,
  uploadPath,
  type,
}: {
  files: AsyncIterable<any> | any[];
  uploadPath: string;
  type: FileType;
}) => {
  const fileUrls: string[] = [];
  const dirname = path.join(__dirname, "../../", "public");
  try {
    for await (let file of files) {
      if (!file) {
        throw new Error("Файл не загружен");
      }

      const fileExt = path.extname(file.filename);
      if (!fileExt) {
        throw new Error("Файл не имеет расширения");
      }

      if (!ALLOWED_FILE_TYPES[type].includes(file.mimetype)) {
        throw new Error("Недопустимый тип файла");
      }
      const randomString = crypto.randomBytes(8).toString("hex");
      const fileName = `${type}_${Date.now()}_${randomString}${fileExt}`;
      const fileSavePath = path.join(`${dirname}${uploadPath}`, fileName);

      const dir = path.dirname(fileSavePath);
      if (!fs.existsSync(dir) || !fs.lstatSync(dir).isDirectory()) {
        fs.mkdirSync(dir, { recursive: true });
      }
      await pump(file.file, fs.createWriteStream(fileSavePath));
      fileUrls.push(`${url}${uploadPath}/${fileName}`);
    }
    return fileUrls;
  } catch (error) {
    console.error(error);
    throw new Error(`Ошибка при загрузке файлов: ${error}`);
  }
};

