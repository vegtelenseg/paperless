const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

const {
  getStudentById,
  getTeacherById,
  getAllStudents,
  getAllTeachers,
  getAllSubjects
} = require('./resolvers');

// Student Type
const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});

StudentType._typeConfig = {
  sqlTable: 'student',
  uniqueKey: 'id'
};

// Teacher Type
const TeacherType = new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});

TeacherType._typeConfig = {
  sqlTable: 'teacher',
  uniqueKey: 'id'
};

const SubjectType = new GraphQLObjectType({
  name: 'Subject',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString)
    }
  })
});
SubjectType._typeConfig = {
  sqlTable: 'subject',
  uniqueKey: 'id'
};

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
      resolve: (parent, args, context, resolveInfo) =>
        getStudentById(parent, args, context, resolveInfo)
    },
    students: {
      type: GraphQLList(StudentType),
      resolve: (parent, args, context, resolveInfo) =>
        getAllStudents(parent, args, context, resolveInfo)
    },

    teacher: {
      type: TeacherType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (parent, args, context, resolveInfo) =>
        getTeacherById(parent, args, context, resolveInfo)
    },
    teachers: {
      type: GraphQLList(TeacherType),
      resolve: (parent, args, context, resolveInfo) =>
        getAllTeachers(parent, args, context, resolveInfo)
    },
    subjects: {
      type: GraphQLList(SubjectType),
      resolve: (parent, args, context, resolveInfo) =>
        getAllSubjects(parent, args, context, resolveInfo)
    }
  })
});

module.exports = {
  RootQueryType
};
