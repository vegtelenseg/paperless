const { GraphQLSchema } = require('graphql');
const RootQueryType = require('./rootQuery');

module.exports = new GraphQLSchema({
  query: RootQueryType
});
