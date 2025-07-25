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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const types_1 = require("./types");
let User = class User extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.ocrResults = [];
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'email', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'salt', default: '' }),
    __metadata("design:type", String)
], User.prototype, "salt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'name' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'surname' }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'phone_number' }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'account_status',
        type: 'enum',
        enum: types_1.AccountStatus,
        default: types_1.AccountStatus.OFFLINE,
    }),
    __metadata("design:type", String)
], User.prototype, "accountStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'type',
        type: 'enum',
        enum: types_1.UserType,
    }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'has_logged_in', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "hasLoggedIn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logged_in_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "loggedInAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
