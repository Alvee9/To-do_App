'use strict'

var express = require('express');
var todoController = require('./controllers/todoController.js');
var app = express();

// set up template engine

// console.log("index.js running :)");

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);
// console.log("routers set")

app.listen(3000);
