import { FastifyReply, FastifyRequest } from "fastify";
import { uploadFile } from "../../utils/uploadFile";

export const uploadAwatar = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const file = await req.file();
    if (!file) {
      return reply.status(400).send({ message: "Файл не загружен" });
    }

    const fileUrl = await uploadFile({ file, uploadPath: "/images/avatars" });
    reply.status(200).send({ url: fileUrl });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при загрузке файла", error });
  }
};
