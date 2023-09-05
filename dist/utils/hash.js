"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
exports.default = {
    make: (value) => {
        return bcrypt.hash(value, salt);
    },
    check: (value, hash) => {
        return bcrypt.compare(value, hash);
    },
    makeSync: (value) => {
        return bcrypt.hashSync(value, salt);
    },
    checkSync: (value, hash) => {
        return bcrypt.compareSync(value, hash);
    }
};
//# sourceMappingURL=hash.js.map