import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";
import { FastifyInstance } from "fastify/types/instance";
export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyCors, {
    origin: ["http://localhost:3000", "https://etnobaza.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
});
