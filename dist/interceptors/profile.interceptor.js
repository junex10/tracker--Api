"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../utils");
let ProfileInterceptor = class ProfileInterceptor {
    intercept(context, next) {
        var _a, _b, _c;
        const auth = (_b = (_a = context.getArgs()[0]) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.authorization;
        if (auth !== '' && auth !== undefined) {
            const jwt = (_c = utils_1.JWTAuth.readToken(auth)) === null || _c === void 0 ? void 0 : _c.permissions;
            const main = jwt.filter(x => (x.actions.main === utils_1.Constants.ACTIONS.MAIN) && (x.actions.code === utils_1.Constants.MODULES.PROFILE));
            if (main.length === 0) {
                throw new common_1.ForbiddenException('Acceso denegado, no hay suficientes permisos para realizar esta acción');
            }
        }
        return next.handle();
    }
};
ProfileInterceptor = __decorate([
    (0, common_1.Injectable)()
], ProfileInterceptor);
exports.ProfileInterceptor = ProfileInterceptor;
//# sourceMappingURL=profile.interceptor.js.map