'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const packageJson = require('../package.json');

const should = chai.should();

chai.use(chaiHttp);

describe('/GET health', () => {
    it('it should GET the health endpoint', (done) => {
        chai.request(server)
            .get('/health')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('application');
                res.body.should.have.property('request');
                res.body.should.have.property('response');
                res.body.should.have.property('application').property('name').eql(packageJson.name);

                done();
            });
    });
});
