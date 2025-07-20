"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountStatus = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "admin";
    UserType["TEACHER"] = "teacher";
    UserType["STUDENT"] = "student";
})(UserType || (exports.UserType = UserType = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["OFFLINE"] = "Offline";
    AccountStatus["ONLINE"] = "Online";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
