"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var productService_1 = __importDefault(require("./product/productService"));
var typeDefs = ["\n  type Query {\n    hello: String\n  }\n     \n  type Mutation {\n    hello(message: String) : String\n  }\n"];
var resolvers = {
    Query: {
        hello: function () { return "Hello"; }
    },
    Mutation: {
        hello: function (_, helloData) {
            var helloMessage = "This is a message to " + helloData.message;
            return helloMessage;
        }
    }
};
var productService = new productService_1.default();
typeDefs += productService.syntax;
productService.configResolvers(resolvers);
var server = new apollo_server_1.ApolloServer({
    resolvers: resolvers,
    typeDefs: typeDefs,
    introspection: true,
    playground: true
});
server.listen(3000)
    .then(function (_a) {
    var url = _a.url;
    return console.log("Server ready at " + url);
});
