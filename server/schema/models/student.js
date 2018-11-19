const { GraphQLObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');

const StudentType = new GraphQLObjectType({
  name: 'Student',
  sqlTable: 'student',
  uniqueKey: 'id',
  fields: () => ({
    id: globalIdField('Student'),
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlColumn: 'name'
    }
  })
});

StudentType._typeConfig = {
  sqlTable: 'student',
  uniqueKey: 'id'
};

module.exports = StudentType;
