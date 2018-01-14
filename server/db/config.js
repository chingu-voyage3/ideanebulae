module.exports = {
  development: {
    username: process.env.DBUSERID || 'postgres',
    password: process.env.DBPASSWD || 'postgres',
    database: process.env.DBNAME || 'ideanebulae_dev',
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT || '5432',
    dialect: 'postgres',
    logging: console.log,
    define: {
      underscored: true, // snake_case timestamps
      underscoredAll: true, // Converts camelCase model names to snake_case
    },
  },
  test: {
    username: process.env.DBUSERID,
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    username: process.env.DBUSERID,
    password: process.env.DBPASSWD,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
}
