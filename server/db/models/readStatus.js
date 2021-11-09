const Sequelize = require("sequelize");
const db = require("../db");

const ReadStatus = db.define("readStatus", {
    read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    readerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = ReadStatus;
