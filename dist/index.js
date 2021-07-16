"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const customer_resolver_1 = __importDefault(require("./resolvers/customer_resolver"));
const type_graphql_1 = require("type-graphql");
dotenv_safe_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_1.createConnection({
        type: "mysql",
        url: process.env.CLEARDB_DATABASE_URL,
        entities: [],
    });
    const app = express_1.default();
    const server = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({ resolvers: [customer_resolver_1.default] }),
    });
    server.applyMiddleware({
        app,
        cors: false,
    });
    const port = process.env.PORT;
    app.listen(parseInt(port), () => {
        console.log(`Server started on http://localhost:${port}`);
        console.log(`GQL Playground on http://localhost:${port}/graphql`);
    });
});
main().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map