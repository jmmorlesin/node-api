'use strict';

const health = {
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


function getHealth(req, res) {
    res.json(health);
}

module.exports = {
    getHealth
};