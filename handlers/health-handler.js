'use strict';

const config = require('config');

const packageJson = require('../package.json');

const healthTemplate = {
    application: {
        name: packageJson.name,
        version: packageJson.version,
        build: config.get('application.build'),
        time: 1
    },
    request: {
        requestedUrl: 'http://...',
        id: 'uuid'
    },
    response: {
        version: '1',
        environment: config.get('application.environment'),
        startTime: Date.now(),
        upTime: 1
    }
};


function generateHealth(req, callback) {
    setImmediate(() => {
        try {
            let health = healthTemplate;
            health.application.time = Date.now();
            health.request.requestedUrl = req.originalUrl;
            health.request.id = req.id;
            health.response.upTime = process.uptime() * 1000;

            return callback(undefined, health);
        } catch (err) {
            return callback(err, undefined);
        }
    });
}

function getHealthInformation(req) {
    return new Promise((resolve, reject) => {
        generateHealth(req, (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
    });
}

module.exports = { getHealthInformation };