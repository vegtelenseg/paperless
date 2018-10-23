const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'F#ck2018',
    database : 'postgres'
  }
});

module.exports = {
  knex
}