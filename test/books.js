let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let Book = require('../models/book.js');
let server = require('../server.js');
chai.use(chaiHttp);
let should = chai.should();

let dummyData = {
    title: 'lorem ipsum dolor sit'
}
const ROUTE = '/api/book';
beforeEach((done) => {
    Book.deleteMany({}, (err) => {
        done();
    });
});

describe('/GET api/book', () => {

    it('should get all books', (done) => {
        chai.request(server).get(ROUTE).end((req, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
        });
    });
});

describe('/POST', () => {

    it('should add a book', (done) => {
        chai.request(server).post(ROUTE).send(dummyData).end((req, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        });
    });
});


describe('/DELETE ', () => {

    it('should delete all books', (done) => {

        chai.request(server).delete(ROUTE).end((req, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string').eql('deleted all books');
            done();
        });
    });
});