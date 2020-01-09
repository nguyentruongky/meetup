"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(id, name, description, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = "USD";
        this.createdAt = new Date().toUTCString();
        this.updatedAt = this.createdAt;
    }
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=product.js.map