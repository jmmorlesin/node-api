'use strict';

const healthTemplate = {
    application: {
        name: 'Node API',
        version: '1.0.0',
        build: '1',
        time: 1
    },
    request: {
        requestedUrl: 'http://...',
        id: 'uuid'
    },
    response: {
        version: '1',
        environment: 'Development',
        startTime: 1,
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