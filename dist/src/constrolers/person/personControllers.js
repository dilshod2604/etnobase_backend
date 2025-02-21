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
exports.deletePerson = exports.updatePerson = exports.fetchPersonById = exports.fetchPersons = exports.createPerson = void 0;
const prisma_1 = require("../../utils/prisma");
const createPerson = (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const personExist = yield prisma_1.prisma.person.findFirst({
            where: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
        });
        if (personExist) {
            reply.status(400).send({
                message: `${personExist.firstName} ${personExist.lastName} уже существует`,
            });
        }
        const person = yield prisma_1.prisma.person.create({
            data: data,
        });
        reply.status(201).send(person);
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
    try {
        const persons = yield prisma_1.prisma.person.findMany();
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
                id: parseInt(id, 10),
            },
            include: {
                awards: true,
                filmography: true,
                image: true,
                video: true,
                sckills: true,
                theater: true,
            },
        });
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
    const data = req.body;
    const { id } = req.params;
    try {
        if (!id || isNaN(Number(id))) {
            return reply.status(400).send({ message: "Id не существует" });
        }
        if (!data || Object.keys(data).length === 0) {
            return reply.status(400).send({ message: "Нет данных для обновления" });
        }
        const person = yield prisma_1.prisma.person.update({
            where: {
                id: parseInt(id, 10),
            },
            data: data,
        });
        reply.status(200).send(person);
    }
    catch (error) {
        console.error(error);
        reply.status(500).send({ message: "Ошибка при обновлении пользователя" });
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
                id: parseInt(id, 10),
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
