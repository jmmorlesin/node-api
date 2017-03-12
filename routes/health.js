'use strict';

const express = require('express');
const router = express.Router();

const healthHandler = require('../handlers/health-handler');

router.get('/', (req, res) => {
    healthHandler.getHealthInformation()
        .then(result => {
            res.json(result);
        });
});

module.exports = router;