"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("@/utils/uuid");
var User = (function () {
    function User(name, email, password) {
        this.id = uuid_1.UUID.generate();
        this.name = name;
        this.email = email;
        this.password = password;
        this.created = new Date().getUTCSeconds();
    }
    return User;
}());
exports.User = User;
