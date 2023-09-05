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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fs = require("fs");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger;
    }
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException ? exception === null || exception === void 0 ? void 0 : exception.message : 'Internal server error';
        const error = (_a = exception === null || exception === void 0 ? void 0 : exception.getResponse()) !== null && _a !== void 0 ? _a : message;
        response
            .status(status)
            .json({
            status: status,
            timestamp: new Date().toISOString(),
            api: request.url,
            error: (error === null || error === void 0 ? void 0 : error.message) ? error === null || error === void 0 ? void 0 : error.message : error.error
        });
        this.logger.error(`Request API: ${request.url}\n Error: ${error.error}`);
        this.errorLog(message, error.error, request.url);
    }
    async errorLog(message, error, request) {
        const date = new Date();
        const dateString = this.dateString(date);
        const PATH = './public/storage/logs/ErrorLogs.txt';
        if (fs.existsSync(PATH)) {
            fs.writeFileSync(PATH, `\n[${dateString}] - ${message}\n[${dateString}] - ${error}\n[${dateString}] - ${request}`, {
                encoding: "utf-8",
                flag: 'a+'
            });
        }
        else {
            fs.createWriteStream(PATH, {
                encoding: 'utf-8',
                flags: 'a+'
            });
            fs.writeFileSync(PATH, `\n[${dateString}] - ${message}\n[${dateString}] - ${error}\n[${dateString}] - ${request}`, {
                encoding: "utf-8",
                flag: 'a+'
            });
        }
    }
    dateString(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException),
    __metadata("design:paramtypes", [])
], HttpExceptionFilter);
exports.default = new HttpExceptionFilter();
//# sourceMappingURL=error.js.map