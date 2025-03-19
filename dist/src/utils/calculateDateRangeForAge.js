"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDateRangeForAge = void 0;
const date_fns_1 = require("date-fns");
const calculateDateRangeForAge = (ageRange) => {
    if (!Array.isArray(ageRange) || ageRange.length !== 2 || ageRange.some((age) => typeof age !== 'number' || isNaN(age))) {
        throw new Error("Age range must be an array of two valid numbers, e.g., [36, 45]");
    }
    const [minAge, maxAge] = ageRange;
    const currentDate = new Date();
    if (isNaN(currentDate.getTime())) {
        throw new Error("Invalid currentDate");
    }
    const startOfAge = (0, date_fns_1.subYears)(currentDate, maxAge + 1);
    const endOfAge = (0, date_fns_1.subYears)(currentDate, minAge);
    if (isNaN(startOfAge.getTime()) || isNaN(endOfAge.getTime())) {
        throw new Error("Invalid Date range calculated.");
    }
    return { startOfAge, endOfAge };
};
exports.calculateDateRangeForAge = calculateDateRangeForAge;
