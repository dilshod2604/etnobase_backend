import { FastifyRequest, FastifyReply } from "fastify";
import { randomUUID } from "crypto";
import { prisma } from "../../../utils/prisma";
import axios from "axios";

export async function googleAuthController(
  req: FastifyRequest<{ Querystring: { code: string; state: string } }>,
  reply: FastifyReply
) {
  try {
    const { token } =
      await req.server.googleOAuth.getAccessTokenFromAuthorizationCodeFlow(req);
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${token.access_token}` },
      }
    );
    if (userInfoResponse.status !== 200) {
      throw new Error("Не удалось получить данные пользователя от Google");
    }

    const userInfo = userInfoResponse.data;

    let user = await prisma.user.upsert({
      where: { email: userInfo.email },
      create: {
        email: userInfo.email,
        name: userInfo.name,
        password: randomUUID(),
        avatar: userInfo.picture,
        provider: "google",
      },
      update: {
        name: userInfo.name,
        avatar: userInfo.picture,
      },
    });

    const accessToken = req.server.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: "5m" }
    );

    const refreshToken = req.server.jwt.sign(
      { id: user.id, email: user.email },
      { expiresIn: "30d" }
    );

    reply.redirect(
      `${process.env.FRONTEND_URL}/auth/google/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: "Ошибка при аутентификации через Google",
      error,
    });
  }
}
