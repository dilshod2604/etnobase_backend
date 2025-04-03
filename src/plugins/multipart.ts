import fp from "fastify-plugin";
import fastifyMultipart from "@fastify/multipart";
import { FastifyInstance } from "fastify";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyMultipart, {
    limits:{
        fileSize:50*1024*1024
    }
  });
});
