const User = require("./userController");
const axios = require("axios");

module.exports = app => {
  // Fetch an existing user (if exists)
  app.get("/user", (req, res) => {
    User.findUser(req.query.name).then(user => {
      if (!user) {
        res.status(404).send("No user found");
      } else {
        res.status(200).send(user);
      }
    });
  });

  // Create a new user
  app.post("/user", (req, res) => {
    User.createUser(req.body.name, req.body.goal)
      .then(user => {
        res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  });

  //Sequelize's update function does not return a model instance with MySQL,
  //which means it has find the user again upon a successful request
  app.put("/user", (req, res) => {

    User.updateUser(req.body.name, req.body.goal).then(() => {
      User.findUser(req.body.name)
        .then(user => {
          res.status(200).send(user);
        })
        .catch(error => res.status(400).send(error));
    });
  });

  /**
   * POST /message
   */

  app.post("/message", (req, res) => {
    axios
      .post("https://shine-se-test-api.herokuapp.com/", { goal: req.body.goal })
      .then(content => res.status(200).send(content.data))
      .catch(err => console.log(err));
  });
};
