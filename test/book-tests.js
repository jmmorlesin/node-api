'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

const Book = require('../models/book');
const jwtHandler = require('../handlers/jwt-handler');

chai.use(chaiHttp);

describe('Book', () => {

    const baseUrl = '/books';
    const credentials = jwtHandler.generateToken({username: 'test'});

    beforeEach((done) => { //Before each test we empty the database
        Book.remove({}, (err) => {
            done();
        });
    });

    describe('/GET/:id book', () => {
        it('it should GET a book by the given id', (done) => {
            let bookTest = new Book({
                title: 'A Song of Ice and Fire',
                author: 'George R. R. Martin'
            });

            bookTest.save((err, book) => {
                chai.request(server)
                    .get(`${baseUrl}/${book.id}`)
                    .set('Authorization', `Bearer ${credentials}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(book.id);
                        res.body.should.have.property('title').eql(bookTest.title);
                        res.body.should.have.property('author').eql(bookTest.author);
                        done();
                    });
            });
        });

        it('it should fail to GET a book by an invalid id', (done) => {
            chai.request(server)
                .get(`${baseUrl}/1234`)
                .set('Authorization', `Bearer ${credentials}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should fail to GET a book using invalid credentials', (done) => {
            chai.request(server)
                .get(`${baseUrl}/1234`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('/POST book', () => {
        it('it should POST a book', (done) => {
            let bookContent = {
                title: 'A Song of Ice and Fire',
                author: 'George R. R. Martin'
            };

            chai.request(server)
                .post(baseUrl)
                .set('Authorization', `Bearer ${credentials}`)
                .send(bookContent)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(bookContent.title);
                    res.body.should.have.property('author').eql(bookContent.author);
                    res.body.should.have.property('_id');
                    done();
                });
        });

        it('it should not POST a book without title', (done) => {
            let bookIncomplete = { author: 'George R. R. Martin' };
            chai.request(server)
                .post(baseUrl)
                .set('Authorization', `Bearer ${credentials}`)
                .send(bookIncomplete)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid book. Should contain title and author');
                    done();
                });
        });

        it('it should not POST a book without author', (done) => {
            let bookIncomplete = { title: 'A Song of Ice and Fire' };
            chai.request(server)
                .post(baseUrl)
                .set('Authorization', `Bearer ${credentials}`)
                .send(bookIncomplete)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid book. Should contain title and author');
                    done();
                });
        });

        it('it should not POST an invalid book', (done) => {
            let bookIncomplete = {
                title: 'A Song of Ice and Fire',
                author: 'George R. R. Martin',
                additionalInfo: 'Invalid property'
            };
            chai.request(server)
                .post(baseUrl)
                .set('Authorization', `Bearer ${credentials}`)
                .send(bookIncomplete)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Invalid book. Should contain title and author');
                    done();
                });
        });

        it('it should fail to POST a book using invalid credentials', (done) => {
            chai.request(server)
                .post(baseUrl)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

    });

    describe('/GET books', () => {
        it('it should GET all the books - 0', (done) => {
            chai.request(server)
                .get(baseUrl)
                .set('Authorization', `Bearer ${credentials}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('it should GET all the books - 1', (done) => {
            let bookTest = new Book({
                title: 'A Song of Ice and Fire',
                author: 'George R. R. Martin'
            });

            bookTest.save((err, success) => {
                chai.request(server)
                    .get(baseUrl)
                    .set('Authorization', `Bearer ${credentials}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1);
                        done();
                    });
            });
        });

        it('it should fail to GET all the books using invalid credentials', (done) => {
            chai.request(server)
                .get(baseUrl)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('/PUT/:id book', () => {
        it('it should UPDATE a book given the id', (done) => {
            let bookTest = new Book({
                title: 'A Song of Ice and Fire',
                author: 'George R. R. Martin'
            });
            bookTest.save((err, book) => {
                chai.request(server)
                    .put(`${baseUrl}/${book.id}`)
                    .set('Authorization', `Bearer ${credentials}`)
                    .send({title: 'Game of Thrones'})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title').eql('Game of Thrones');
                        res.body.should.have.property('author').eql('George R. R. Martin');
                        res.body.should.have.property('_id').eql(book.id);
                        done();
                    });
            });
        });

        it('it should fail UPDATE a book with an invalid id', (done) => {
                chai.request(server)
                    .put(`${baseUrl}/1234`)
                    .set('Authorization', `Bearer ${credentials}`)
                    .send({title: 'Game of Thrones'})
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.should.be.a('object');
                        done();
                    });
        });

        it('it should fail to UPDATE a book using invalid credentials', (done) => {
            chai.request(server)
                .put(`${baseUrl}/1234`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

    describe('/DELETE/:id book', () => {
        it('it should DELETE a book given the id', (done) => {
            let bookTest = new Book({
                title: 'A Song of Ice and Fire',
                author: 'George R. R. Martin'
            });
            bookTest.save((err, book) => {
                chai.request(server)
                    .delete(`${baseUrl}/${book.id}`)
                    .set('Authorization', `Bearer ${credentials}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });
        });

        it('it should fail to DELETE a book using invalid credentials', (done) => {
            chai.request(server)
                .delete(`${baseUrl}/1234`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

});
