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
exports.Chats = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require(".");
let Chats = class Chats extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.ChatSession, 'chat_session_id'),
    __metadata("design:type", _1.ChatSession)
], Chats.prototype, "chat_session", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.User, 'sender_id'),
    __metadata("design:type", _1.User)
], Chats.prototype, "sender", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Chats.prototype, "sender_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Chats.prototype, "chat_session_id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Chats.prototype, "message", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Chats.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Chats.prototype, "updated_at", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Chats.prototype, "deleted_at", void 0);
Chats = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: 'chats'
    })
], Chats);
exports.Chats = Chats;
//# sourceMappingURL=chats.js.map