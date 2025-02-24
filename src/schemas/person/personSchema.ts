import z from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { PersonRole } from "@prisma/client";
import { filmographySchemaResponse } from "./filmography/personFilmography.schema";
import { personAwardsSchemaResponse } from "./awards/personAwardsSchema";
import { personImageResponse } from "./image/personImage";
import { personSckillsSchemaResponse } from "./sckills/personSckillsSchema";
import { personVideoResponse } from "./video/personVideo.scema";
import { personTheatreSchemaResponse } from "./theatre/personTheatreSchema";

const PersonScheme = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  dateOfBirth: z.string().optional().nullable(),
  cityOfLive: z.string().min(2).max(255),
  citizenship: z.string().min(2).max(255),
  education: z.string().min(2).max(255).optional().nullable(),
  height: z.number().optional().nullable(),
  weight: z.number().optional().nullable(),
  lengthOfHair: z.number().optional().nullable(),
  colorOfEyes: z.string().min(2).max(255).optional().nullable(),
  colorOfHair: z.string().min(2).max(255).optional().nullable(),
  role: z.nativeEnum(PersonRole),
  avatar: z.string().min(2).max(255).optional(),
});
//create

const aditionalPersonSchema = z.object({
  filmography: z.array(filmographySchemaResponse).optional(),
  awards: z.array(personAwardsSchemaResponse).optional(),
  image: z.array(personImageResponse).optional(),
  sckills: z.array(personSckillsSchemaResponse).optional(),
  video: z.array(personVideoResponse).optional(),
  theater: z.array(personTheatreSchemaResponse).optional(),
});

const createPersonSchema = PersonScheme;
//fetch
const personResponseSchema = PersonScheme.extend({
  id: z.number().int(),
});
const personsResponseSchema = z.array(personResponseSchema);
const personParamsSchema = z.object({
  id: z.number().int(),
});
//fetchOnePerson
const onePersonResponseSchema = PersonScheme.merge(
  aditionalPersonSchema
).extend({
  id: z.number().int(),
});

export type CreatePersonInput = z.infer<typeof createPersonSchema>;
export type UpdatePerssonInput = z.infer<typeof personResponseSchema>;

export const { schemas: personSchema, $ref } = buildJsonSchemas(
  {
    personsResponseSchema,
    personResponseSchema,
    personParamsSchema,
    createPersonSchema,
    onePersonResponseSchema,
  },
  { $id: "PersonSchema" }
);
