module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
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
    pool: {
      min: 0,
      max: 7
    },
    debug: true
  }
};
