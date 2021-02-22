"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const context_1 = require("./context");
const schema_1 = require("./schema");
const server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    context: context_1.createContext,
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at: ${url}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api`);
});
//# sourceMappingURL=server.js.map