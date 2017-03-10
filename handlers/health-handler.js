'use strict';

const packageJson = require('../package.json');

const healthTemplate = {
    application: {
        name: packageJson.name,
        version: packageJson.version,
        build: process.env.BUILD,
        time: 1
    },
    request: {
        requestedUrl: 'http://...',
        id: 'uuid'
    },
    response: {
        version: '1',
        environment: process.env.ENVIRONMENT,
        startTime: Date.now(),
        upTime: 1
    }
};


function generateHealth(callback) {
    setImmediate(() => {
        try {
            let health = healthTemplate;
            health.response.upTime = process.uptime() * 1000;

            return callback(undefined, health);
        } catch (err) {
            return callback(err, undefined);
        }
    });
}

function getHealthInformation() {
    return new Promise((resolve, reject) => {
        generateHealth((err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
    });
}

module.exports = { getHealthInformation };