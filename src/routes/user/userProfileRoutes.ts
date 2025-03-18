import  { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { uploadAwatar } from "../../constrolers/person/uploadAwatar";
import { $ref } from "../../schemas/user/avatars/userAvatarSchema";

export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/user/avatars",
    {
      schema: {
        response: {
          200: $ref("userAvatarsResponse"),
        },
      },
    },
    uploadAwatar
  );
});
