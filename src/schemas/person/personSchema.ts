import z from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { PersonRole, Person_type, Person_sex } from "@prisma/client";

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
  person_type: z.nativeEnum(Person_type),
  sex: z.nativeEnum(Person_sex),
  avatar: z.string().min(2).max(255).optional(),
  phoneNumber: z.string().optional().nullable(),
});

const personRole = z.object({
  id: z.number(),
  personId: z.number().int(),
  role: z.nativeEnum(PersonRole),
});

const aditionalPersonSchema = z.object({
  roles: z.array(personRole).optional(),
  filmography: z.array(filmographySchemaResponse).optional(),
  awards: z.array(personAwardsSchemaResponse).optional(),
  image: personImageResponse.optional(),
  sckills: z.array(personSckillsSchemaResponse).optional(),
  video: z.array(personVideoResponse).optional(),
  theater: z.array(personTheatreSchemaResponse).optional(),
});

//createPerson
const createPersonSchema = PersonScheme.extend({
  roles: z.array(personRole.omit({ id: true, personId: true })),
});

//fechPersonResponse
const personResponseSchema = PersonScheme.extend({
  roles: z.array(personRole.omit({ id: true, personId: true })),
  id: z.number().int(),
});

//fetchManyPersonResonse
const personsResponseSchema = z.array(personResponseSchema);

//params
const personParamsSchema = z.object({
  id: z.number().int(),
});

//fetchOnePersonByIdResponse
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
