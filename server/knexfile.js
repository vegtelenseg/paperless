module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'F#ck2018',
      database: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations/`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    },
    debug: true
  }
};
