'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

function generateToken(user) {
    return jwt.sign(
        { username: user.username },
        config.get('jwt.secret'),
        { expiresIn: '1h' }
    );
}

module.exports = { generateToken };