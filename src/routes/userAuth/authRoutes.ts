import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { $ref } from "../../schemas/authScemas/AuthSchemas";
import {
  getMe,
  signIn,
  signUp,
} from "../../constrolers/auth/user/userAuthController";
import { refreshAccessToken } from "../../constrolers/auth/user/refreshAccessToken";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/sign-up",
    {
      schema: {
        body: $ref("signUpSchema"),
        response: {
          201: $ref("signUpUserResponse"),
        },
      },
    },
    signUp
  );

  fastify.post(
    "/sign-in",
    {
      schema: {
        body: $ref("singInUserSchema"),
        response: {
          200: $ref("signInUserResponse"),
        },
      },
    },
    signIn
  );

  fastify.get(
    "/user/:id",
    {
      preHandler: [fastify.authJWT],
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        response: {
          200: $ref("getUserResonse"),
        },
      },
    },
    getMe
  );

  fastify.post(
    "/refresh-token",
    {
      schema: {
        response: {
          200: $ref("refreshTockenResponse"),
        },
      },
    },
    refreshAccessToken
  );
});
