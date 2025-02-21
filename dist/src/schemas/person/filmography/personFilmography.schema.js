"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.filmographySchema = exports.filmographySchemaResponse = exports.FilmographySchema = void 0;
const zod_1 = require("zod");
const fastify_zod_1 = require("fastify-zod");
exports.FilmographySchema = zod_1.z.object({
    personId: zod_1.z.number().int(),
    releaseYear: zod_1.z.number(),
    movieName: zod_1.z.string().min(2).max(255),
    role: zod_1.z.string().optional().nullable(),
});
exports.filmographySchemaResponse = exports.FilmographySchema.extend({
    id: zod_1.z.number().int(),
});
const createFilmographySchema = exports.FilmographySchema;
//params
const filmogramphyParmasSchema = zod_1.z.object({
    id: zod_1.z.number().int(),
});
const updateFilmography = zod_1.z.object({
    releaseYear: zod_1.z.number(),
    movieName: zod_1.z.string().min(2).max(255),
    role: zod_1.z.string().optional().nullable(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    filmographySchemaResponse: exports.filmographySchemaResponse,
    createFilmographySchema,
    filmogramphyParmasSchema,
    updateFilmography,
}, { $id: "filmographySchema" }), exports.filmographySchema = _a.schemas, exports.$ref = _a.$ref;
