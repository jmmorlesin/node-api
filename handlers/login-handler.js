'use strict';

const jwtHandler = require('./jwt-handler');
const config = require('config');


function generateCredentials(user, callback) {
    setImmediate(() => {
        try {
            let credentials = {
                username: user.username,
                token: null
            };

            credentials.token = jwtHandler.generateToken(user);

            return callback(undefined, credentials);
        } catch (err) {
            return callback(err, undefined);
        }
    });
}

function login(user) {
    return new Promise((resolve, reject) => {
        generateCredentials(user, (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
    });
}

function validateUserContent(user) {
    if (user == null) return false;
    if (Object.keys(user).length != 2) return false;
    if (!user.hasOwnProperty('username') || !user.hasOwnProperty('password')) return false;

    for (let property in user)
        if (user[property] == null || user[property].trim() === '')
            return false;

    return true;
}

function validateCredentials(user) {
    return user.username === config.get('credentials.username') && user.password === config.get('credentials.password');
}

module.exports = {
    login,
    validateUserContent,
    validateCredentials
};