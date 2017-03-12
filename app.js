'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./lib/db');
db.connect();


const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
const health = require('./routes/health');
const book = require('./routes/book');

app.use('/health', health);
app.use('/books', book);

app.listen(3000, function () {
    console.log('Node API listening on port 3000');
});

//Export app to test
module.exports = app;
