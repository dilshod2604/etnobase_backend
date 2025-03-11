import fp from "fastify-plugin";

import fastifyCookie from "@fastify/cookie";
import { FastifyInstance } from "fastify/types/instance";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyCookie, {});
});
