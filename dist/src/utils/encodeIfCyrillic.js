"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeIfCyrillic = void 0;
const encodeIfCyrillic = (str) => {
    return /[а-яА-ЯЁё]/.test(str) ? encodeURIComponent(str) : str;
};
exports.encodeIfCyrillic = encodeIfCyrillic;
