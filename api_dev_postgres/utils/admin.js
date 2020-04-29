const { Pool } = require("pg");

const db = new Pool({
  user: "hrushi",
  password: "hrushi",
  host: "localhost",
  port: 5432,
  database: "justTanned",
});

module.exports = { db };
