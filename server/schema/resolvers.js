const joinMonster = require('join-monster');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'F#ck2018',
    database : 'postgres'
  },
  searchPath: ['knex', 'public']
});

knex.raw('SELECT * from student where student_id = 1').then(val => console.log(val.rows));

module.exports = {
  Query: (parent, args, context, resolveInfo) => {
    return joinMonster(resolveInfo, {}, sql => {
      console.log("Sql: ", sql)
      // knex is a SQL query library for NodeJS. This method returns a `Promise` of the data
      return knex.raw(sql)
    }, {
      dialect: 'pg'
    })
  }
}