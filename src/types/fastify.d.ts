import "@fastify/oauth2";

declare module "fastify" {
  interface FastifyInstance {
    googleOAuth: import("@fastify/oauth2").OAuth2Namespace;
  }
}
