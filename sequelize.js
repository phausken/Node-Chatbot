const Sequelize = require("sequelize");
const sequelize = new Sequelize("se_test", "se_candidate", "shineon", {
  host: "shine-se-test-dev.c3atgknvyfon.us-west-2.rds.amazonaws.com",
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection successful!");
  })
  .catch(err => console.log("Unable to connect to database:", err));

module.exports = sequelize;
