const { StudentType, SubjectType, TeacherType } = require('./models');
const { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLID } = require('graphql');
const dbCall = require('./dbCall').knexRaw;

module.exports = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    student: {
      type: GraphQLNonNull(StudentType),
      where: (userTable, _args, { user }) => `${userTable}.id = ${user.id}`,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (_parent, _args, context, resolveInfo) =>
        dbCall(_parent, _args, context, resolveInfo)
    },
    students: {
      type: GraphQLList(StudentType),
      resolve: (parent, args, context, resolveInfo) => dbCall(parent, args, context, resolveInfo)
    },

    teacher: {
      type: TeacherType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (parent, args, context, resolveInfo) => dbCall(parent, args, context, resolveInfo)
    },
    teachers: {
      type: GraphQLList(TeacherType),
      resolve: (parent, args, context, resolveInfo) => dbCall(parent, args, context, resolveInfo)
    },
    subjects: {
      type: GraphQLList(SubjectType),
      resolve: (parent, args, context, resolveInfo) => dbCall(parent, args, context, resolveInfo)
    }
  })
});
