import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../utils/prisma";

export const refreshAccessToken = async (
  req: FastifyRequest<{ Body: { refreshToken: string } }>,
  reply: FastifyReply
) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return reply.status(400).send({ message: "Отсутствует refreshToken" });
    }

    const decoded = await req.server.jwt.verify<{ id: number; email: string }>(
      refreshToken
    );

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return reply.status(404).send({ message: "Пользователь не найден" });
    }

    const newAccessToken = req.server.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: "5m" }
    );

    return reply.status(200).send({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
    return reply
      .status(500)
      .send({ message: "Ошибка сервера при обновлении токена" });
  }
};
