import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import fastifyOauth2, { FastifyOAuth2Options } from "@fastify/oauth2";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register<FastifyOAuth2Options>(fastifyOauth2, {
    name: "googleOAuth",
    scope: ["profile", "email"],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID as string,
        secret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/auth/google",
    callbackUri: `${process.env.APP_URL}/auth/google/callback`,
  });
});
