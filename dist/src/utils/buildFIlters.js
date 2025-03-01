"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFilters = void 0;
const buildFilters = (filtersFunctions, query) => {
    if (!Array.isArray(filtersFunctions)) {
        throw new Error("filtersFunctions must be an array");
    }
    let filters = {};
    filtersFunctions.forEach((filterFn) => {
        const filter = filterFn(query);
        if (filter) {
            filters = Object.assign(Object.assign({}, filters), filter);
        }
    });
    return filters;
};
exports.buildFilters = buildFilters;
