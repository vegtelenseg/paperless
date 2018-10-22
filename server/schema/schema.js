const joinMonster = require('join-monster').default;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString
} = require('graphql');


const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'F#ck2018',
    database : 'postgres'
  }
});


const Student = new GraphQLObjectType({
  name: 'Student',
  fields: {
    student_id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    student_name: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
});

Student._typeConfig = {
  sqlTable: 'student',
  uniqueKey: 'student_id'
}

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    student: {
      type: Student,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, context,
          sql => knex.raw(sql).then(val => {
            return val;
          })
        )
      }
    }
  })
})

module.exports =  new GraphQLSchema({
  query: RootQuery
})