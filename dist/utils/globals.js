"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const _1 = require("./");
class Globals {
    constructor() {
        this.formatMiles = (n, decimals = true, currency = '$') => {
            n = Math.round(n * 100) / 100;
            var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), j = (j = i.length) > 3 ? j % 3 : 0;
            return currency + ' ' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        };
        this.filterByUrl = (url) => {
            const SYMBOLS = /(\$)|(\.)|(\?)|(\#)|(\%)|(\&)|(\/)|(\*)|(\{)|(\})|(\\)|(\:)|(\<)|(\>)|(\+)/g;
            return url.replace(SYMBOLS, '');
        };
        this.calculateAge = (birthdate) => Math.floor((moment().unix() - moment(birthdate).unix()) / 31556926);
        this.randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        this.getTokenByLevel = (level) => {
            const token = _1.Constants.TOKENS.find(c => c.LEVEL === level).KEY;
            return token;
        };
    }
}
exports.default = new Globals();
//# sourceMappingURL=globals.js.map