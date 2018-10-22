const { GraphQLSchema } = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');
const joinMonster = require('join-monster').default;

const dataFilePath = '/Library/PostgreSQL/9.6/data/'
const knex = require('knex')({
  client: 'postgres',
  connection: {
    filename: dataFilePath,
  }
});

const Student = new GraphQLObjectType({
  name: 'Student',
  sqlTable: 'student',
  uniqueKey: 'id',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    }
  })
});

const QueryRoot = new GraphQLObjectType({
  name: 'QueryRoot',
  fields: () => ({
    student: {
      type: new GraphQLList(Student),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          console.log("Sql: ", sql)
          // knex is a SQL query library for NodeJS. This method returns a `Promise` of the data
          return knex.raw(sql)
        }, {
          dialect: 'pg'
        })
      }
    }
  })
});

module.exports = new GraphQLSchema({
  description: 'The paperless schema',
  query: QueryRoot
})