const {
  GraphQLSchema
} = require('graphql');
const { RootQueryType } = require('./types');

module.exports =  new GraphQLSchema({
  query: RootQueryType
})