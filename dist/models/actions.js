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
exports.Actions = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require(".");
let Actions = class Actions extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.Modules, 'module_id'),
    __metadata("design:type", _1.Modules)
], Actions.prototype, "module", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Actions.prototype, "main", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Actions.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Actions.prototype, "code", void 0);
Actions = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: 'actions'
    })
], Actions);
exports.Actions = Actions;
//# sourceMappingURL=actions.js.map