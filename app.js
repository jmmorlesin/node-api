'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const config = require('config');
const addRequestId = require('express-request-id')();


const db = require('./handlers/db-handler');
db.connect();


const app = express();
app.use(addRequestId);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//JWT Security
app.use(expressJWT({secret: config.get('jwt.secret')}).unless({path:[
    '/login',
    '/health'
]}));


// Routes
const health = require('./routes/health');
const book = require('./routes/book');
const login = require('./routes/login');

app.use('/health', health);
app.use('/books', book);
app.use('/login', login);

app.listen(3000, function () {
    console.log('Node API listening on port 3000');
});

//Export app to test
module.exports = app;
