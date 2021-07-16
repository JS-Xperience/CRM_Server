import { createConnection } from "typeorm";
import dotenv from "dotenv-safe";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import CustomerResolver from "./resolvers/customer_resolver";
import { buildSchema } from "type-graphql";

dotenv.config();

const main = async () => {
  await createConnection({
    type: "mysql",
    url: process.env.CLEARDB_DATABASE_URL,
    entities: [],
  });

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({ resolvers: [CustomerResolver] }),
    introspection: true,
  });

  server.applyMiddleware({
    app,
    cors: false,
  });

  const port = process.env.PORT as string;

  app.listen(parseInt(port), () => {
    console.log(`Server started on http://localhost:${port}`);
    console.log(`GQL Playground on http://localhost:${port}/graphql`);
  });
};

main().catch((err) => {
  console.error(err);
});
