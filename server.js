const axios = require('axios').default;
var cheerio = require("cheerio");
var express = require("express");
var nodemon = require("nodemon");
// var http = require("http");
// var fs = require("fs");

var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/html.js")(app);
require("./routes/api.js")(app);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
