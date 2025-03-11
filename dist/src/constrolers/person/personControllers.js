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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.updatePerson = exports.fetchPersonById = exports.fetchPersons = exports.createPerson = void 0;
const prisma_1 = require("../../utils/prisma");
const buildFIlters_1 = require("../../utils/buildFIlters");
const personFIlter_1 = require("../../filters/personFilters/personFIlter");
const createPerson = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { roles } = data, personData = __rest(data, ["roles"]);
    try {
        const personExist = yield prisma_1.prisma.person.findFirst({
            where: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
        });
        if (personExist) {
            return reply.status(400).send({
                message: `${personExist.firstName} ${personExist.lastName} уже существует`,
            });
        }
        const person = yield prisma_1.prisma.person.create({
            data: personData,
        });
        if (roles.length > 0) {
            yield prisma_1.prisma.personRoleMapping.createMany({
                data: roles.map((role) => ({
                    personId: person.id,
                    role: role.role,
                })),
            });
        }
        //временно
        const personWithRoles = yield prisma_1.prisma.person.findUnique({
            where: { id: person.id },
            include: { roles: true },
        });
        reply.status(201).send(personWithRoles);
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Ошибка при создании Person", error: error });
    }
});
exports.createPerson = createPerson;
const fetchPersons = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, role } = req.query;
    console.log("role", role);
    const filter = (0, buildFIlters_1.buildFilters)([personFIlter_1.filterByName, personFIlter_1.filterByAge, personFIlter_1.filterByRole], {
        name,
        age: Number(age),
        role,
    });
    console.log("filter", filter);
    try {
        const persons = yield prisma_1.prisma.person.findMany({
            where: filter,
            include: {
                roles: true,
            },
        });
        if (!persons || persons.length === 0) {
            return reply.status(404).send({
                message: "Пользователи не найдены",
            });
        }
        reply.status(200).send(persons);
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Oшибка при получение пользователей", error: error });
    }
});
exports.fetchPersons = fetchPersons;
const fetchPersonById = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id || isNaN(Number(id))) {
            return reply.status(400).send({ message: "Id не существует" });
        }
        const person = yield prisma_1.prisma.person.findFirst({
            where: {
                id: id,
            },
            include: {
                awards: true,
                filmography: true,
                image: true,
                video: true,
                sckills: true,
                theater: true,
                roles: true,
            },
        });
        console.log(person);
        if (!person) {
            return reply.badRequest("Пользовател не найден");
        }
        reply.status(200).send(person);
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Oшибка при получение пользователя", error: error });
    }
});
exports.fetchPersonById = fetchPersonById;
const updatePerson = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const { roles } = data, personData = __rest(data, ["roles"]);
    try {
        const personExist = yield prisma_1.prisma.person.findUnique({
            where: { id },
        });
        if (!personExist) {
            return reply.status(404).send({
                message: "Человек с таким ID не найден",
            });
        }
        const result = yield prisma_1.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            const person = yield prisma.person.update({
                where: { id },
                data: personData,
            });
            yield prisma.personRoleMapping.deleteMany({
                where: { personId: id },
            });
            yield prisma.personRoleMapping.createMany({
                data: roles.map((role) => ({
                    personId: id,
                    role: role.role,
                })),
            });
            //временно
            const personWithRoles = yield prisma.person.findUnique({
                where: { id: person.id },
                include: { roles: true },
            });
            return personWithRoles;
        }));
        reply.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        reply
            .status(500)
            .send({ message: "Ошибка при обновлении Person", error: error });
    }
});
exports.updatePerson = updatePerson;
const deletePerson = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id || isNaN(Number(id))) {
            return reply.status(400).send({ message: "Id не существует" });
        }
        const person = yield prisma_1.prisma.person.delete({
            where: {
                id: id,
            },
        });
        reply.status(200).send(person);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обновлении пользователя" });
    }
});
exports.deletePerson = deletePerson;
