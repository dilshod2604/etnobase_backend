"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPerson = void 0;
const prisma_1 = require("../../../utils/prisma");
const buildFIlters_1 = require("../../../utils/buildFIlters");
const personFIlter_1 = require("../../../filters/personFilters/personFIlter");
const searchPerson = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, city, sex } = req.query;
    try {
        if (!name) {
            return reply.status(400).send({ message: "Необходимо ввести имя" });
        }
        const search = (0, buildFIlters_1.buildFilters)([personFIlter_1.filterByName, personFIlter_1.filterBySex, personFIlter_1.filterByCityOfLive], {
            name: decodeURIComponent(name),
            sex,
            cityOfLive: decodeURIComponent(city ? city : ""),
        });
        const persons = yield prisma_1.prisma.person.findMany({
            where: search,
            include: {
                roles: true,
            },
        });
        if (persons.length === 0) {
            return reply
                .status(404)
                .send({ message: "Персонажей с таким именем не найдено" });
        }
        reply.status(200).send(persons);
    }
    catch (error) {
        console.error(error);
    }
});
exports.searchPerson = searchPerson;
