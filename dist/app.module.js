"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const sequelize_1 = require("@nestjs/sequelize");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const socket_controller_1 = require("./utils/socket/socket.controller");
const socket_module_1 = require("./utils/socket/socket.module");
const nestjs_pdf_1 = require("./vendor/nestjs-pdf");
const SequelizeConfig = require('./config');
const mailer_2 = require("./utils/mailer");
const path = require("path");
const schedule_1 = require("@nestjs/schedule");
const controllers_1 = require("./controllers");
const models_1 = require("./models");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            sequelize_1.SequelizeModule.forRoot(Object.assign(Object.assign({}, SequelizeConfig), { models: [
                    models_1.Level,
                    models_1.User,
                    models_1.Modules,
                    models_1.Notifications,
                    models_1.NotificationType,
                    models_1.PasswordReset,
                    models_1.Permissions,
                    models_1.Person,
                    models_1.Actions,
                    models_1.CompanyInformation,
                    models_1.Petition,
                    models_1.Process,
                    models_1.ChatSession,
                    models_1.Chats,
                    models_1.ChatUsers
                ] })),
            mailer_1.MailerModule.forRoot(mailer_2.MAIL_CONFIG),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            nestjs_pdf_1.PDFModule.register({
                isGlobal: true,
                view: {
                    root: path.join(__dirname, 'resources/templates'),
                    engine: 'handlebars',
                    extension: 'hbs',
                },
            }),
            controllers_1.AuthModule,
            socket_module_1.SocketModule,
            controllers_1.NotificationsModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
        providers: [
            socket_controller_1.SocketController
        ],
        controllers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map