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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../../../models");
const utils_1 = require("../../../utils");
const sequelize_2 = require("sequelize");
let NotificationsService = class NotificationsService {
    constructor(notificationsTypeModel, notificationsModel, userModel) {
        this.notificationsTypeModel = notificationsTypeModel;
        this.notificationsModel = notificationsModel;
        this.userModel = userModel;
        this.newTreatment = async (request) => {
            const personal = await this.userModel.findAll({
                where: {
                    [sequelize_2.Op.or]: [
                        {
                            level_id: utils_1.Constants.LEVELS.ADMIN
                        },
                        {
                            level_id: utils_1.Constants.LEVELS.PATIENT
                        }
                    ]
                }
            });
            const notificationType = await this.notificationsTypeModel.findOne({ where: { code: request.code } });
            const message = 'Se ha registrado un nuevo tratamiento';
            personal.map(async (value) => {
                await this.notificationsModel.create({
                    title: notificationType.name,
                    message,
                    receiver_id: value.id,
                    sender_id: request.user_id,
                    status: utils_1.Constants.NOTIFICATIONS.STATUS.UNREADED
                });
            });
            return true;
        };
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(models_1.NotificationType)),
    __param(1, (0, sequelize_1.InjectModel)(models_1.Notifications)),
    __param(2, (0, sequelize_1.InjectModel)(models_1.User)),
    __metadata("design:paramtypes", [Object, Object, Object])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map