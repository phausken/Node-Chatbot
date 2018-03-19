"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

// Parse application/json
app.use(bodyParser.json());

// The header on line 15 does not allow for 'put' requests, hence the additional
// CORS configuration
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

require("./routes.js")(app);

/**
 * Start listening for connections
 */
app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
