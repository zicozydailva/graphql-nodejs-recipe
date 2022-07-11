import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected!!!");
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server is running on port ${res.url}`));
