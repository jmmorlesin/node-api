'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
const health = require('./routes/health');

app.use('/health', health);

app.listen(3000, function () {
    console.log('Node API listening on port 3000');
});

//Export app to test
module.exports = app;
