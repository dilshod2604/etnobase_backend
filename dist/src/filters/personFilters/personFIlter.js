"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByRole = exports.filterByAge = exports.filterByName = void 0;
const calculateDateRangeForAge_1 = require("../../utils/calculateDateRangeForAge");
const formatDate_1 = require("../../utils/formatDate");
const filterByName = (query) => {
    if (query.name) {
        return {
            firstName: {
                contains: query.name,
            },
        };
    }
    return null;
};
exports.filterByName = filterByName;
const filterByAge = (query) => {
    if (query.age) {
        const { endOfAge, startOfAge } = (0, calculateDateRangeForAge_1.calculateDateRangeForAge)(query.age);
        const start = (0, formatDate_1.formatDateToString)(startOfAge);
        const end = (0, formatDate_1.formatDateToString)(endOfAge);
        return {
            dateOfBirth: {
                gte: start,
                lte: end,
            },
        };
    }
    return null;
};
exports.filterByAge = filterByAge;
const filterByRole = (query) => {
    if (query.role && typeof query.role === "string") {
        const roles = query.role
            .split(",")
            .map((role) => role);
        return {
            roles: {
                some: {
                    role: {
                        in: roles,
                    },
                },
            },
        };
    }
    return null;
};
exports.filterByRole = filterByRole;
