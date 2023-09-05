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
exports.ViewedDTO = exports.DeleteDTO = exports.GetLogsDTO = exports.NewMessageDTO = exports.NewChatDTO = exports.GetChatsDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetChatsDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GetChatsDTO.prototype, "user_id", void 0);
exports.GetChatsDTO = GetChatsDTO;
class NewChatDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], NewChatDTO.prototype, "sender_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NewChatDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], NewChatDTO.prototype, "receiver_id", void 0);
exports.NewChatDTO = NewChatDTO;
class NewMessageDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], NewMessageDTO.prototype, "sender_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NewMessageDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], NewMessageDTO.prototype, "session_id", void 0);
exports.NewMessageDTO = NewMessageDTO;
class GetLogsDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], GetLogsDTO.prototype, "chat_session_id", void 0);
exports.GetLogsDTO = GetLogsDTO;
class DeleteDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DeleteDTO.prototype, "chat_session_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DeleteDTO.prototype, "host_id", void 0);
exports.DeleteDTO = DeleteDTO;
class ViewedDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ViewedDTO.prototype, "chat_session_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ViewedDTO.prototype, "user_id", void 0);
exports.ViewedDTO = ViewedDTO;
//# sourceMappingURL=chat.entity.js.map