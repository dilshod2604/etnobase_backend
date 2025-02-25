"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByName = void 0;
const filterByName = (query) => {
    if (query) {
        return {
            firstName: {
                contains: query.name,
            },
        };
    }
    return null;
};
exports.filterByName = filterByName;
