const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql');

const { getStudentById, getTeacherById } = require('./resolvers');

// Student Type
const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    student_id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    student_name: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});

StudentType._typeConfig = {
  sqlTable: 'student',
  uniqueKey: 'student_id'
}

// Teacher Type
const TeacherType = new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    teacher_id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    teacher_name: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});

TeacherType._typeConfig = {
  sqlTable: 'teacher',
  uniqueKey: 'teacher_id'
}

// Root Type
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    student: {
      type: StudentType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (parent, args, context, resolveInfo) => getStudentById(parent, args, context, resolveInfo)
    },
    teacher: {
      type: TeacherType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (parent, args, context, resolveInfo) => getTeacherById(parent, args, context, resolveInfo)
    }
  })
});


module.exports = {
  RootQueryType
}