"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ql = "\ntype Product {\n    name: String,\n    description: String,\n    id: String,\n    price: Float\n}\n\nextend type Query {\n    getProduct(id: String!): Product\n}\n\nextend type Mutation {\n    product(name:String, description: String, price: Float): Product!\n}\n";
