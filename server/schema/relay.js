const { fromGlobalId, nodeDefinitions } = require('graphql-relay');

const { nodeField, nodeInterface } = nodeDefinitions(
  // resolve the ID to an object
  (globalId, context, resolveInfo) => {
    // parse the globalID
    const { type, id } = fromGlobalId(globalId);

    // pass the type name and other info. `joinMonster` will find the type from the name and write the SQL
    return joinMonster.getNode(
      type,
      resolveInfo,
      context,
      parseInt(id, 10),
      async sql =>
        // Extract rows
        (await knex.raw(sql))[0],
      options
    );
  },
  // determines the type. Join Monster places that type onto the result object on the "__type__" property
  obj => obj.__type__
);

module.exports = { nodeInterface, nodeField };
