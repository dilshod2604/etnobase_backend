"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByCityOfLive = exports.filterByNationality = exports.filterByPersonType = exports.filterBySex = exports.filterByRole = exports.filterByAge = exports.filterByName = void 0;
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
        const ages = query.age.split(",").map(Number);
        const { endOfAge, startOfAge } = (0, calculateDateRangeForAge_1.calculateDateRangeForAge)(ages);
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
const filterBySex = (query) => {
    if (query.sex) {
        return {
            sex: {
                equals: query.sex,
            },
        };
    }
    return null;
};
exports.filterBySex = filterBySex;
const filterByPersonType = (query) => {
    if (query.sex) {
        return {
            person_type: {
                equals: query.person_type,
            },
        };
    }
    return null;
};
exports.filterByPersonType = filterByPersonType;
const filterByNationality = (query) => {
    if (query.nationality && typeof query.nationality === "string") {
        const nationalities = query.nationality.split(",").map((nation) => nation);
        return {
            nationality: {
                in: nationalities,
            },
        };
    }
    return null;
};
exports.filterByNationality = filterByNationality;
const filterByCityOfLive = (query) => {
    if (query.cityOfLive && typeof query.cityOfLive === "string") {
        const cities = query.cityOfLive.split(",").map((city) => city);
        return {
            cityOfLive: {
                in: cities,
            },
        };
    }
    return null;
};
exports.filterByCityOfLive = filterByCityOfLive;
