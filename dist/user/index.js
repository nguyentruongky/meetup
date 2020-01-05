"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var UsersService = (function () {
    function UsersService() {
        this.users = [];
    }
    UsersService.prototype.configTypeDefs = function () {
        var typeDefs = "\n            type User {\n                firstName: String, \n                lastName: String, \n                int: Int, \n                password: String, \n                permissionLevel: Int, \n                email: String\n            }\n        ";
        typeDefs += "\n            extend type Query {\n                getUsers: [User]\n            }\n        ";
        typeDefs += "\n            extend type Mutation {\n                registerUser(firstName: String, \n                    lastName: String, \n                    password: String, \n                    permissionLevel: Int, \n                    email: String, \n                    id: Int): User!\n            }    \n        ";
        return typeDefs;
    };
    UsersService.prototype.configResolvers = function (resolvers) {
        var _this = this;
        resolvers.Query.getUsers = function () {
            return _this.users;
        };
        resolvers.Mutation.registerUser = function (_, user) {
            var salt = crypto.randomBytes(16).toString("base64");
            var hash = crypto.createHmac("sha512", salt).update(user.password).digest("base64");
            user.password = hash;
            _this.users.push(user);
            return user;
        };
    };
    return UsersService;
}());
exports.UsersService = UsersService;
