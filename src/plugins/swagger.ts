import fp from "fastify-plugin";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";
import { personSchema } from "../schemas/person/personSchema";
import { filmographySchema } from "../schemas/person/filmography/personFilmography.schema";
import { PersonImageScheme } from "../schemas/person/image/personImage";
import { PersonVideoScheme } from "../schemas/person/video/personVideo.scema";
import { PersonsSckillsSchema } from "../schemas/person/sckills/personSckillsSchema";
import { PersonsAwardsSchema } from "../schemas/person/awards/personAwardsSchema";
import { PersonsTheatreSchema } from "../schemas/person/theatre/personTheatreSchema";

export default fp(async (fastify: FastifyInstance) => {
  const schemas = [
    ...personSchema,
    ...filmographySchema,
    ...PersonImageScheme,
    ...PersonVideoScheme,
    ...PersonsSckillsSchema,
    ...PersonsAwardsSchema,
    ...PersonsTheatreSchema,
  ];

  schemas.forEach((schema) => {
    if (!fastify.getSchema(schema.$id)) {
      fastify.addSchema(schema);
    }
  });

  const swaggerOptions = {
    swagger: {
      info: {
        title: "Fastify auth API",
        description: "API документация вашего сервера",
        version: "1.0.0",
      },
      host: "localhost:8000",
      basePath: "/",
      tags: [
        { name: "etno_base", description: "Документация API routes etno_base" },
      ],
    },
  };

  fastify.register(swagger, swaggerOptions);

  fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: { docExpansion: "none", deepLinking: false },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
});
