module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/auth.db3' },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
  "jest": {
    "testEnvirnoment": "node"
  },
  test: "jest --watch --verbose",
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/authTest.db3',
    },
    useNullAsDefault: true,
  }
};
