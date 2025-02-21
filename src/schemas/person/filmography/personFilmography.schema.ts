import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const FilmographySchema = z.object({
  personId: z.number().int(),
  releaseYear: z.number(),
  movieName: z.string().min(2).max(255),
  role: z.string().optional().nullable(),
});
export const filmographySchemaResponse = FilmographySchema.extend({
  id: z.number().int(),
});
const createFilmographySchema = FilmographySchema;
//params
const filmogramphyParmasSchema = z.object({
  id: z.number().int(),
});
const updateFilmography = z.object({
  releaseYear: z.number(),
  movieName: z.string().min(2).max(255),
  role: z.string().optional().nullable(),
});

export type creatFilmographyInput = z.infer<typeof FilmographySchema>;
export type updateFilmographyInput = z.infer<typeof updateFilmography>;

export const { schemas: filmographySchema, $ref } = buildJsonSchemas(
  {
    filmographySchemaResponse,
    createFilmographySchema,
    filmogramphyParmasSchema,
    updateFilmography,
  },
  { $id: "filmographySchema" }
);
