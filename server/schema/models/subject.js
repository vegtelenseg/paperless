const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../relay');

const SubjectType = new GraphQLObjectType({
  name: 'Subject',
  fields: () => ({
    id: globalIdField('Subject'),
    name: {
      type: GraphQLNonNull(GraphQLString),
      sqlTable: 'subject'
    }
  }),
  interfaces: [nodeInterface]
});
SubjectType._typeConfig = {
  sqlTable: 'subject',
  uniqueKey: 'id'
};

module.exports = SubjectType;
