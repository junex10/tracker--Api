"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientGuard = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
let PatientGuard = class PatientGuard {
    canActivate(context) {
        var _a, _b, _c, _d;
        const auth = (_c = (_b = (_a = context.getArgs()[0]) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.replace('Bearer ', '');
        const errorMessage = 'Acceso denegado, no hay suficientes permisos para realizar esta acción';
        if (auth !== '' && auth !== undefined) {
            const key = (_d = utils_1.JWTAuth.readToken(auth)) === null || _d === void 0 ? void 0 : _d.key;
            const main = utils_1.Constants.TOKENS.find(x => x.KEY === key);
            if (main === undefined) {
                throw new common_1.ForbiddenException(errorMessage);
            }
            else {
                if ((main.LEVEL !== utils_1.Constants.LEVELS.PATIENT) &&
                    (main.LEVEL !== utils_1.Constants.LEVELS.ADMIN)) {
                    throw new common_1.ForbiddenException(errorMessage);
                }
            }
        }
        else {
            throw new common_1.ForbiddenException(errorMessage);
        }
        return true;
    }
};
PatientGuard = __decorate([
    (0, common_1.Injectable)()
], PatientGuard);
exports.PatientGuard = PatientGuard;
//# sourceMappingURL=patient.guard.js.map