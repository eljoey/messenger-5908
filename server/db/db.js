const Sequelize = require("sequelize");
require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD } = process.env;

const db = new Sequelize('messenger', DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = db;
