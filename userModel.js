const Sequelize = require("sequelize");
const sequelize = require("./sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      field: "id",
      primaryKey: true
    },

    name: {
      type: Sequelize.STRING,
      field: "name"
    },

    goal: {
      type: Sequelize.STRING,
      field: "goal"
    }
  },
  {
    tableName: "users"
  }
);

module.exports = User;
