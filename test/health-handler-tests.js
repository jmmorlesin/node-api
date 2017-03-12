'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();

const subject = require('../handlers/health-handler');

const packageJson = require('../package.json');


describe('Health handler', () => {
    describe('Testing health handler', () => {

        it('Validating structure and content of the health information in the health handler', () => {
            const healthPromise = subject.getHealthInformation();

            return healthPromise.then(function (health) {
                health.should.be.a('object');
                health.should.have.property('application');
                health.should.have.property('request');
                health.should.have.property('response');
                health.should.have.property('application').property('name').eql(packageJson.name);
                health.should.have.property('response').property('environment').eql('test');
            });
        });

    });
});

