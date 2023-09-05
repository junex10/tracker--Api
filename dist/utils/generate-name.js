"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("./hash");
const moment = require("moment");
const generateName = (format) => {
    return `${hash_1.default.makeSync(Math.floor(Math.random() * 100000) + moment().format('YYYYMMDDHHmmss'))
        .replace(/\//g, '')
        .replace(/\./g, '')
        .replace(/,/g, '')}.${format}`;
};
exports.default = generateName;
//# sourceMappingURL=generate-name.js.map