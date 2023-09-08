"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const auth_entity_1 = require("./auth.entity");
const auth_service_1 = require("./auth.service");
const utils_1 = require("../../../utils");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(request, response) {
        try {
            const user = await this.authService.findUserVerified(request.email);
            const errorMessage = 'Las credenciales ingresadas son incorrectas y/o la cuenta no está verificada, intente nuevamente';
            if (!user) {
                return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                    error: errorMessage
                });
            }
            if (await utils_1.Hash.check(request.password, user.password)) {
                const jwtData = {
                    user_id: user.id,
                    level_id: user.level_id
                };
                const apiKey = utils_1.Globals.getTokenByLevel(user.level.id);
                const userFilter = {
                    id: user.id,
                    email: user.email,
                    level: user.level,
                    verified: user.verified,
                    status: user.status,
                    person: user.person
                };
                const token = utils_1.JWTAuth.createToken({ jwtData, key: apiKey });
                return response.status(common_1.HttpStatus.OK).json({
                    data: Object.assign({ user: userFilter }, token)
                });
            }
            else {
                return response.status(common_1.HttpStatus.OK).json({
                    error: errorMessage
                });
            }
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async register(request, response, file) {
        try {
            if (request.password != request.password_confirmation) {
                return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                    error: 'Las contraseñas no coinciden'
                });
            }
            const _user = await this.authService.findByEmail(request.email);
            if (_user) {
                return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                    error: 'El correo electrónico ya se encuentra registrado'
                });
            }
            const user = await this.authService.createUser(request, file);
            return response.status(common_1.HttpStatus.OK).json({
                user
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async recover(request, response) {
        try {
            const user = await this.authService.findByEmail(request.email);
            if (!user || user.level_id == utils_1.Constants.LEVELS.ADMIN) {
                return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                    error: 'El correo electrónico no se encuentra registrado'
                });
            }
            await this.authService.recover(request, user);
            return response.status(common_1.HttpStatus.OK).json({
                user
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async checkCode(request, response) {
        try {
            const password = await this.authService.getCode(request.code);
            if (!password) {
                return response.status(common_1.HttpStatus.OK).json({
                    result: false
                });
            }
            return response.status(common_1.HttpStatus.OK).json({
                result: true
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async reset(request, response) {
        try {
            if (request.password != request.password_confirmation) {
                return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                    error: 'Las contraseñas no coinciden'
                });
            }
            const password = await this.authService.getCode(request.code);
            if (!password) {
                return response.status(common_1.HttpStatus.OK).json({
                    result: false
                });
            }
            const user = await this.authService.findByPk(password.user_id);
            if (user.level_id == utils_1.Constants.LEVELS.ADMIN) {
                return response.status(common_1.HttpStatus.OK).json({
                    result: false
                });
            }
            await this.authService.updatePassword(request, user, password);
            return response.status(common_1.HttpStatus.OK).json({
                result: true
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async modules(params, response) {
        try {
            return response.status(common_1.HttpStatus.OK).json({
                modules: await this.authService.getModules(params.level)
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async verify(response, request) {
        try {
            const url = request.url;
            const verified = await this.authService.verify(url);
            if (verified) {
                return response.status(common_1.HttpStatus.OK).json({
                    message: 'Usuario verificado correctamente'
                });
            }
            else {
                return response.status(common_1.HttpStatus.OK).json({
                    error: 'No se pudo verificar al usuario y/o el usuario ya fue verificado'
                });
            }
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async checkPermissions(response, request) {
        try {
            const verified = await this.authService.checkPermissions(request.token, request.code);
            if (!verified) {
                return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                    error: 'No se pudo ingresar a la pantalla por falta de permisos'
                });
            }
            else {
                return response.status(common_1.HttpStatus.OK).json({
                    message: 'Acceso permitido'
                });
            }
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.LoginParams, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/register'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', (0, utils_1.UploadFile)('users'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.RegisterParams, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/recover'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.RecoverParams, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recover", null);
__decorate([
    (0, common_1.Post)('/check-code'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.CheckCodeParams, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkCode", null);
__decorate([
    (0, common_1.Post)('/reset'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.ResetParams, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "reset", null);
__decorate([
    (0, common_1.Post)('/modules/:level?'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "modules", null);
__decorate([
    (0, common_1.Post)('/verify'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_entity_1.VerifyUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('checkPermissions'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_entity_1.PermissionDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkPermissions", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map