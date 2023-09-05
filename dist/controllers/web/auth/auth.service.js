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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../../../models");
const mailer_1 = require("@nestjs-modules/mailer");
const auth_entity_1 = require("./auth.entity");
const utils_1 = require("../../../utils");
let AuthService = class AuthService {
    constructor(userModel, passwordResetModel, moduleModel, personModel, permissionModel, mailerService) {
        this.userModel = userModel;
        this.passwordResetModel = passwordResetModel;
        this.moduleModel = moduleModel;
        this.personModel = personModel;
        this.permissionModel = permissionModel;
        this.mailerService = mailerService;
        this.findUserVerified = async (email) => {
            const user = await this.userModel.findOne({
                include: [{
                        model: models_1.Level,
                        include: ['permissions']
                    }],
                where: {
                    email,
                    verified: utils_1.Constants.USER.USER_VERIFIED.VERIFIED
                }
            });
            user.save();
            return user;
        };
        this.verify = async (url) => {
            const user = await this.userModel.update({
                verified: utils_1.Constants.USER.USER_VERIFIED.VERIFIED
            }, {
                where: {
                    token: url,
                    verified: utils_1.Constants.USER.USER_VERIFIED.NO_VERIFIED
                }
            });
            return user[0];
        };
        this.checkPermissions = async (permissions, code) => {
            var _a, _b;
            const jwt = utils_1.JWTAuth.readToken(permissions);
            const user = await this.userModel.findOne({
                include: [{
                        model: models_1.Level,
                        include: ['permissions']
                    }],
                where: { id: (_a = jwt.jwtData) === null || _a === void 0 ? void 0 : _a.user_id }
            });
            const auth = (_b = user.level) === null || _b === void 0 ? void 0 : _b.permissions.filter((value) => code === value.actions.code);
            if (auth !== null) {
                if (auth.length > 0) {
                    return true;
                }
            }
            return false;
        };
        this.generateURL = async () => {
            let numbers = '';
            const min = 0;
            const max = 9;
            for (let x = 0; x < 6; x++) {
                numbers += (Math.floor(Math.random() * (max - min)) + min).toString();
            }
            return `verify/${utils_1.Globals.filterByUrl(await utils_1.Hash.make(numbers))}`;
        };
    }
    findByEmail(email) {
        return this.userModel.findOne({
            where: {
                email
            }
        });
    }
    findByPk(user_id) {
        return this.userModel.findOne({
            where: {
                id: user_id
            }
        });
    }
    getCode(code) {
        return this.passwordResetModel.findOne({
            where: {
                code,
                status: utils_1.Constants.PASSWORD_RESET_STATUS.ACTIVE
            }
        });
    }
    async updatePassword(request, user, password) {
        await this.userModel.update({
            password: utils_1.Hash.makeSync(request.password)
        }, {
            where: {
                id: user.id
            }
        });
        this.passwordResetModel.destroy({
            where: {
                id: password.id
            }
        });
        return this.passwordResetModel.update({
            status: utils_1.Constants.PASSWORD_RESET_STATUS.INACTIVE
        }, {
            where: {
                id: password.id
            }
        });
    }
    async recover(request, user) {
        await this.passwordResetModel.update({
            status: utils_1.Constants.PASSWORD_RESET_STATUS.INACTIVE
        }, {
            where: {
                user_id: user.id,
                status: utils_1.Constants.PASSWORD_RESET_STATUS.ACTIVE
            }
        });
        let code = '';
        for (let x = 0; x < 6; x++) {
            code += `${utils_1.Globals.randomInt(0, 9)}`;
        }
        await this.passwordResetModel.create({
            user_id: user.id,
            code,
            status: utils_1.Constants.PASSWORD_RESET_STATUS.ACTIVE
        });
        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Recuperación de Contraseña | ' + process.env.MAIL_FROM_NAME,
                template: './reset',
                context: {
                    code
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    async createUser(request, file) {
        var _a, _b, _c;
        const user = await this.userModel.create({
            email: request.email,
            password: utils_1.Hash.makeSync(request.password),
            level_id: request.level_id || utils_1.Constants.LEVELS.PATIENT,
            photo: file ? ('users/' + file.filename) : null,
            token: await this.generateURL(),
        });
        const person = await this.personModel.create({
            name: (_a = request.name) !== null && _a !== void 0 ? _a : null,
            lastname: (_b = request.lastname) !== null && _b !== void 0 ? _b : null,
            phone: (_c = request.phone) !== null && _c !== void 0 ? _c : null,
            medical_history: utils_1.Constants.USER.PERSON.MEDICAL_HISTORY.DISABLED,
            user_id: user.id
        });
        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Confirmación de cuenta | ' + process.env.MAIL_FROM_NAME,
                template: './register',
                context: {
                    user: person.name,
                    confirm_url: user.token
                }
            });
        }
        catch (e) {
            console.log(e);
        }
        return user;
    }
    async getModules(level) {
        let modules = [];
        if (level !== undefined)
            modules = await this.moduleModel.findAll();
        else
            modules = await this.moduleModel.findAll();
        return modules;
    }
};
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.ResetParams, models_1.User, models_1.PasswordReset]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "updatePassword", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.RecoverParams, models_1.User]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "recover", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_entity_1.RegisterParams, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "createUser", null);
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(models_1.PasswordReset)),
    __param(2, (0, sequelize_1.InjectModel)(models_1.Modules)),
    __param(3, (0, sequelize_1.InjectModel)(models_1.Person)),
    __param(4, (0, sequelize_1.InjectModel)(models_1.Permissions)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map