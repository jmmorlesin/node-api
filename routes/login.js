'use strict';

const express = require('express');
const router = express.Router();

const loginHandler = require('../handlers/login-handler');


router.post('/', (req, res) => {
    let user = req.body;

    if (!loginHandler.validateUserContent(user) || !loginHandler.validateCredentials(user)) {
        return res.status(401).json({message: 'Invalid credentials.'});
    }

    loginHandler.login(user)
        .then(result => {
            res.status(200).json(result);
        });
});

module.exports = router;