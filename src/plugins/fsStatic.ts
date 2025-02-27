import fp from "fastify-plugin";
import fastifyStatic from "@fastify/static";
import { FastifyInstance } from "fastify";
import path from "path";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../../public"),
  });
});
