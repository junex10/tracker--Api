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
exports.Permissions = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require(".");
let Permissions = class Permissions extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Permissions.prototype, "action_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.Actions, 'action_id'),
    __metadata("design:type", Array)
], Permissions.prototype, "actions", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Permissions.prototype, "level_id", void 0);
Permissions = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        include: [{
                model: _1.Actions,
                attributes: ['id', 'name', 'code', 'main'],
                include: [{
                        model: _1.Modules,
                        attributes: ['id', 'name', 'icon', 'code', 'status']
                    }]
            }]
    })),
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'permissions'
    })
], Permissions);
exports.Permissions = Permissions;
//# sourceMappingURL=permissions.js.map