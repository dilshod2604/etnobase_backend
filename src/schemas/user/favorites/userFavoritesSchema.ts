import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { personRole, PersonScheme } from "../../person/personSchema";

const userFavoritesSchema = z.object({
  userId: z.number().int(),
  personId: z.number().int(),
});

const userFavoritesResponseSchema = z.object({
  message: z.string(),
});
const deleteAllFavoritesSchema = userFavoritesSchema.omit({
  personId: true,
});
//временно
const getUserFavoritesPersonsSchema = z.array(
  z.object({
    id: z.number().int(),
    userId: z.number().int(),
    isFavorite: z.boolean(),
    personId: z.number().int(),
    person: PersonScheme.extend({
      id: z.number().int(),
      roles: z.array(personRole.omit({ id: true, personId: true })),
    }),
  })
);

export type UserFavoritesInput = z.infer<typeof userFavoritesSchema>;
export type DeleteALLFavoritesInput = z.infer<typeof deleteAllFavoritesSchema>;

export const { schemas: UserFavoritesSchema, $ref } = buildJsonSchemas(
  {
    deleteAllFavoritesSchema,
    userFavoritesResponseSchema,
    userFavoritesSchema,
    getUserFavoritesPersonsSchema,
  },
  { $id: "UserFavorites" }
);
