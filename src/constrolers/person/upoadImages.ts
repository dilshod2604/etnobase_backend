import { FastifyReply, FastifyRequest } from "fastify";
import { uploadFiles } from "../../utils/uploadFile";
import { url } from "inspector";

export const uploadImages = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const files = await req.files();

    if (!files) {
      return reply.status(400).send({ message: "Файлы не загружены" });
    }

    const fileUrls = await uploadFiles({
      files,
      uploadPath: "/images/personImages",
    });
    reply
      .status(200)
      .send({
        message: "Файлы успешно загруженно",
        urls: fileUrls,
      });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: "Ошибка при загрузке файлаов", error });
  }
};
