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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const chat_entity_1 = require("./chat.entity");
const chat_service_1 = require("./chat.service");
const guards_1 = require("../../../guards");
const utils_1 = require("../../../utils");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getChats(request, response) {
        try {
            const chats = await this.chatService.getChats(request);
            return response.status(common_1.HttpStatus.OK).json({
                chats
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async newChat(response, request) {
        try {
            const chats = await this.chatService.newChat(request);
            if (chats !== null) {
                return response.status(common_1.HttpStatus.OK).json({
                    chats
                });
            }
            return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                error: 'No se pudo crear el chat'
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async newMessage(response, request, files) {
        try {
            const message = await this.chatService.newMessage(request, files);
            if (message) {
                return response.status(common_1.HttpStatus.OK).json({
                    message
                });
            }
            return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                error: 'No se pudo enviar el mensaje'
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async getLogs(request, response) {
        try {
            const chats = await this.chatService.getLogs(request);
            return response.status(common_1.HttpStatus.OK).json({
                chats
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async delete(response, request) {
        try {
            const chat = await this.chatService.delete(request);
            if (chat) {
                return response.status(common_1.HttpStatus.OK).json({
                    chat: 'Se ha borrado el chat correctamente'
                });
            }
            return response.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).json({
                error: 'No se pudo borrar el chat'
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async viewed(response, request) {
        try {
            const process = await this.chatService.viewed(request);
            return response.status(common_1.HttpStatus.OK).json({
                process
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
    async getUsers(response) {
        try {
            const users = await this.chatService.getUsers();
            return response.status(common_1.HttpStatus.OK).json({
                users
            });
        }
        catch (e) {
            throw new common_1.UnprocessableEntityException('Ha ocurrido un error de conexión, intente nuevamente', e.message);
        }
    }
};
__decorate([
    (0, common_1.Post)('getChats'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_entity_1.GetChatsDTO, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChats", null);
__decorate([
    (0, common_1.Post)('newChat'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_entity_1.NewChatDTO]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "newChat", null);
__decorate([
    (0, common_1.Post)('newMessage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('attachments', 5, (0, utils_1.UploadFile)('chat'))),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_entity_1.NewMessageDTO, Array]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "newMessage", null);
__decorate([
    (0, common_1.Post)('getLogs'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_entity_1.GetLogsDTO, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_entity_1.DeleteDTO]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('viewed'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chat_entity_1.ViewedDTO]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "viewed", null);
__decorate([
    (0, common_1.Get)('getUsers'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getUsers", null);
ChatController = __decorate([
    (0, swagger_1.ApiTags)('Chat - Patient'),
    (0, common_1.UseGuards)(guards_1.GeneralGuard),
    (0, common_1.Controller)('api/patient/chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map