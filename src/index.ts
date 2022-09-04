import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";

import { resolvers } from "./resolvers";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// ApolloServerにデータを渡す
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

// サーバーの立ち上げ
server.listen().then(({ url }) => {
  console.log("🚀  Server ready at " + url);
});
