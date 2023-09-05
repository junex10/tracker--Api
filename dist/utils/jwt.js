"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
class JWTAuth {
    constructor() {
        this.createToken = (data) => {
            const key = process.env.API_KEY;
            const token = jwt.sign(data, key, {
                expiresIn: 60 * 60 * 24,
                algorithm: "HS256"
            });
            return { token };
        };
        this.readToken = (token) => {
            const key = process.env.API_KEY;
            const data = jwt.verify(token, key);
            return data;
        };
    }
}
exports.default = new JWTAuth();
//# sourceMappingURL=jwt.js.map