"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UUID = /** @class */ (function () {
    function UUID() {
    }
    UUID.generate = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
            var random = Math.random() * 16 | 0; // Nachkommastellen abschneiden
            var value = char === "x" ? random : (random % 4 + 8); // Bei x Random 0-15 (0-F), bei y Random 0-3 + 8 = 8-11 (8-b) gemäss RFC 4122
            return value.toString(16); // Hexadezimales Zeichen zurückgeben
        });
    };
    return UUID;
}());
exports.UUID = UUID;
