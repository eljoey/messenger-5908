const Sequelize = require("sequelize");
require('dotenv').config();

const db = new Sequelize(process.env.DB_URL, {
  logging: false
});

module.exports = db;
