const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../relay');

const TeacherType = new GraphQLObjectType({
  name: 'Teacher',
  fields: () => ({
    id: globalIdField('Teacher'),
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlTable: 'name'
    }
  }),
  interfaces: [nodeInterface]
});

TeacherType._typeConfig = {
  sqlTable: 'teacher',
  uniqueKey: 'id'
};

module.exports = TeacherType;
