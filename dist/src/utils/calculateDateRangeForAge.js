"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDateRangeForAge = void 0;
const date_fns_1 = require("date-fns");
const calculateDateRangeForAge = (age) => {
    if (typeof age !== 'number' || isNaN(age)) {
        throw new Error("Age must be a valid number");
    }
    const currentDate = new Date();
    if (isNaN(currentDate.getTime())) {
        throw new Error("Invalid currentDate");
    }
    const startOfAge = (0, date_fns_1.subYears)(currentDate, age + 1);
    const endOfAge = (0, date_fns_1.subYears)(currentDate, age);
    if (isNaN(startOfAge.getTime()) || isNaN(endOfAge.getTime())) {
        throw new Error("Invalid Date range calculated.");
    }
    return { startOfAge, endOfAge };
};
exports.calculateDateRangeForAge = calculateDateRangeForAge;
