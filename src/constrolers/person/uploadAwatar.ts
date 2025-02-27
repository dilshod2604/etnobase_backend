import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { uploadFile } from "../../utils/fileUploadUtils";

export const uploadAwatar = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const file = await req.file();

    if (!file) {
      return reply.status(400).send({ message: "Файл не загружен" });
    }

    const uploadPath = path.join(
      __dirname,
      "../../../",
      "public/images/avatars"
    );
    

    const fileUrl = await uploadFile(file, uploadPath,);
    reply.status(200).send({ url: fileUrl });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при загрузке файла", error });
  }
};
