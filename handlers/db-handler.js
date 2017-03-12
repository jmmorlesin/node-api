'use strict';

const mongoose = require('mongoose');
const config = require('config');

function connect() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.get('database.mongodbUri'));
    mongoose.connection.on('error', () => {
        console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
        process.exit();
    });
}

module.exports = {connect};