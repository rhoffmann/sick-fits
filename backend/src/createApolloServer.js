const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { parse } = require('graphql');

const Mutation = require('./resolvers/Mutation.js');
const Query = require('./resolvers/Query.js');
const db = require('./db');

const createServer = () => return new ApolloServer({
  typeDefs: parse(importSchema(__dirname + '/schema.graphql')),
  resolvers: {
    Mutation,
    Query
  },
  context: ({ req }) => {
    return {
      ...req, db
    }
    // `req.request` is now just `req`
  }
});

module.exports = createServer;