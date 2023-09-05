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
exports.ChatUsers = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require(".");
let ChatUsers = class ChatUsers extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.ChatSession, 'chat_session_id'),
    __metadata("design:type", _1.ChatSession)
], ChatUsers.prototype, "chat_session", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.User, 'user_id'),
    __metadata("design:type", _1.User)
], ChatUsers.prototype, "sender", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ChatUsers.prototype, "viewed", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ChatUsers.prototype, "created_at", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ChatUsers.prototype, "updated_at", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ChatUsers.prototype, "deleted_at", void 0);
ChatUsers = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        paranoid: true,
        tableName: 'chats_users'
    })
], ChatUsers);
exports.ChatUsers = ChatUsers;
//# sourceMappingURL=chats-users.js.map