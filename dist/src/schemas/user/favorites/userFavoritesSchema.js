"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.UserFavoritesSchema = void 0;
const fastify_zod_1 = require("fastify-zod");
const zod_1 = require("zod");
const personSchema_1 = require("../../person/personSchema");
const userFavoritesSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    personId: zod_1.z.number().int(),
});
const userFavoritesResponseSchema = zod_1.z.object({
    message: zod_1.z.string(),
});
const deleteAllFavoritesSchema = userFavoritesSchema.omit({
    personId: true,
});
//временно
const getUserFavoritesPersonsSchema = zod_1.z.array(zod_1.z.object({
    id: zod_1.z.number().int(),
    userId: zod_1.z.number().int(),
    isFavorite: zod_1.z.boolean(),
    personId: zod_1.z.number().int(),
    person: personSchema_1.PersonScheme.extend({
        id: zod_1.z.number().int(),
        roles: zod_1.z.array(personSchema_1.personRole.omit({ id: true, personId: true })),
    }),
}));
_a = (0, fastify_zod_1.buildJsonSchemas)({
    deleteAllFavoritesSchema,
    userFavoritesResponseSchema,
    userFavoritesSchema,
    getUserFavoritesPersonsSchema,
}, { $id: "UserFavorites" }), exports.UserFavoritesSchema = _a.schemas, exports.$ref = _a.$ref;
