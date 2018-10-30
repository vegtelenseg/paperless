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
      directory: `${__dirname}/migrations/`
    },
    seeds: {
      directory: `${__dirname}/seeds`
    },
    pool: {
      min: 0,
      max: 7
    }
  }
}