'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./userController');
// Parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/user', (req, res) => {
  User.findUser(req.query.name)
    .then((user) => {
      if(!user){
        res.status(404).send("No user found");
      } else {
        res.status(200).send(user);
      }
    }
  );
});

app.post('/user', (req, res) => {
  User.createUser(req.body.name, req.body.goal)
    .then((user) => {
      res.status(200).send(user);
    }).catch(error => res.status(400).send(error));
});
/**
 * POST /message
 */

 //Sequelize's update function does not return a model instance with MySQL,
 //which means it has find the user again upon a successful request

app.post('/message', (req, res) => {
  User.updateUser(req.body.name, req.body.goal)
    .then(() => {
      User.findUser(req.body.name)
        .then((user) => {
          res.status(200).send(user);
        }).catch(error => res.status(400).send(error));
    });
});

/**
 * Start listening for connections
 */
app.listen(8081, () => {
  console.log('Listening on port 8081...');
});
