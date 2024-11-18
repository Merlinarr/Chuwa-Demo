const mysql = require("mysql");

const db = mysql.createPool({
  host: "",
  user: "",
  port: 0,
  password: "",
  database: "",
});

module.exports = db;
