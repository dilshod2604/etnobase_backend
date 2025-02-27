import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { uploadAwatar } from "../../constrolers/person/uploadAwatar";
import { $ref } from "../../schemas/person/avatars/personsAvatarSchema";
export default fp(async (fastify: FastifyInstance) => {
  fastify.post(
    "/persons/avatars",
    {
      schema: {
        response: {
          200: $ref("personAvatarsResponse"),
        },
      },
    },
    uploadAwatar
  );
});
