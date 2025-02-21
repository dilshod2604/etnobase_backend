"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ref = exports.personSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fastify_zod_1 = require("fastify-zod");
const client_1 = require("@prisma/client");
const personFilmography_schema_1 = require("./filmography/personFilmography.schema");
const personAwardsSchema_1 = require("./awards/personAwardsSchema");
const personImage_1 = require("./image/personImage");
const personSckillsSchema_1 = require("./sckills/personSckillsSchema");
const personVideo_scema_1 = require("./video/personVideo.scema");
const personTheatreSchema_1 = require("./theatre/personTheatreSchema");
const PersonScheme = zod_1.default.object({
    firstName: zod_1.default.string().min(2).max(255),
    lastName: zod_1.default.string().min(2).max(255),
    dateOfBirth: zod_1.default.date().optional().nullable(),
    cityOfLive: zod_1.default.string().min(2).max(255),
    citizenship: zod_1.default.string().min(2).max(255),
    education: zod_1.default.string().min(2).max(255).optional().nullable(),
    height: zod_1.default.number().optional().nullable(),
    weight: zod_1.default.number().optional().nullable(),
    lengthOfHair: zod_1.default.number().optional().nullable(),
    colorOfEyes: zod_1.default.string().min(2).max(255).optional().nullable(),
    colorOfHair: zod_1.default.string().min(2).max(255).optional().nullable(),
    role: zod_1.default.nativeEnum(client_1.Person_role),
});
//create
const aditionalPersonSchema = zod_1.default.object({
    filmography: zod_1.default.array(personFilmography_schema_1.filmographySchemaResponse).optional(),
    awards: zod_1.default.array(personAwardsSchema_1.personAwardsSchemaResponse).optional(),
    image: zod_1.default.array(personImage_1.personImageResponse).optional(),
    sckills: zod_1.default.array(personSckillsSchema_1.personSckillsSchemaResponse).optional(),
    video: zod_1.default.array(personVideo_scema_1.personVideoResponse).optional(),
    theater: zod_1.default.array(personTheatreSchema_1.personTheatreSchemaResponse).optional(),
});
const createPersonSchema = PersonScheme;
//fetch
const personResponseSchema = PersonScheme.extend({
    id: zod_1.default.number().int(),
});
const personsResponseSchema = zod_1.default.array(personResponseSchema);
const personParamsSchema = zod_1.default.object({
    id: zod_1.default.number().int(),
});
//fetchOnePerson
const onePersonResponseSchema = PersonScheme.merge(aditionalPersonSchema).extend({
    id: zod_1.default.number().int(),
});
_a = (0, fastify_zod_1.buildJsonSchemas)({
    personsResponseSchema,
    personResponseSchema,
    personParamsSchema,
    createPersonSchema,
    onePersonResponseSchema,
}, { $id: "PersonSchema" }), exports.personSchema = _a.schemas, exports.$ref = _a.$ref;
