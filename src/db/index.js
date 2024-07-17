const postgres = require('postgres');

const db = postgres({
  host: process.env.PGHOST,
  port: 5432,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: 'true',
});

module.exports = db;
