import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { $ref } from "../../schemas/authScemas/AuthSchemas";
import {
  forgotPassword,
  getMe,
  resetPassword,
  signIn,
  signUp,
  verifyResetCode,
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
    "/user",
    {
      preHandler: [fastify.authJWT],
      schema: {
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
        body: $ref("refreshTockenRequest"),
        response: {
          200: $ref("refreshTockenResponse"),
        },
      },
    },
    refreshAccessToken
  );
  fastify.post(
    "/forgot-password",
    {
      schema: {
        body: $ref("forgotPasswordRequest"),
        response: {
          200: $ref("forgotPasswordResponse"),
        },
      },
    },
    forgotPassword
  );
  fastify.post(
    "/verify-code",
    {
      schema: {
        body: $ref("verifyResetCodeRequest"),
        response: {
          200: $ref("forgotPasswordResponse"),
        },
      },
    },
    verifyResetCode
  );
  fastify.post(
    "/reset-password",
    {
      schema: {
        body: $ref("resetPasswordRequest"),
        response: {
          200: $ref("forgotPasswordResponse"),
        },
      },
    },
    resetPassword
  );
});
