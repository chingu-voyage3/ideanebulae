module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'ideanebulae_dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    define: {
      underscored: true, // snake_case timestamps
      underscoredAll: true, // Converts camelCase model names to snake_case
    },
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'ideanebulae_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
    define: {
      underscored: true,
      underscoredAll: true,
    },
  },
}
