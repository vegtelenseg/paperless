const joinMonster = require('join-monster').default;
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);

module.exports = class SqlService {
  knexRaw(_parent, _args, ctx, resolveInfo) {
    try {
      console.log('Ri: ', resolveInfo.fieldNodes[0].arguments[0].value);
      return joinMonster(resolveInfo, ctx, sql => knex.raw(sql));
    } catch (error) {
      console.error(`Error Querying DB: ${error}`);
    }
  }
};
