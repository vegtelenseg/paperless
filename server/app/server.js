const express = require('express');
const { ApolloServer } = require('apollo-server-express');
//const schema = require('../schema/schema');
const resolvers = require('../schema/resolvers');
const typeDefs = require('../schema/types');
const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({typeDefs, resolvers});
const server = new ApolloServer({schema});

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);