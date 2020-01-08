"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var index_1 = require("./graphqls/index");
var server = new apollo_server_1.ApolloServer({
    resolvers: index_1.resolvers,
    typeDefs: index_1.typeDefs,
    introspection: true,
    playground: true
});
server.listen(3000).then(function (_a) {
    var url = _a.url;
    return console.log("Server ready at " + url);
});
