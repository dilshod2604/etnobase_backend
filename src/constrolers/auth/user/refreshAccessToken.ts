import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../utils/prisma";

export const refreshAccessToken = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    console.log("refreshToken", refreshToken);
    if (!refreshToken) {
      return reply.status(401).send({ message: "Токен отсутствует" });
    }

    const decoded = req.server.jwt.verify<{ id: number; email: string }>(
      refreshToken
    );
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return reply.status(404).send({ message: "Пользователь не найден" });
    }

    const newAccessToken = req.server.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: "7d" }
    );

    reply.send({
      message: "AccessToken обновлён",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    reply.status(403).send({ message: "Недействительный refresh токен" });
  }
};
