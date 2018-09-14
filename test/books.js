let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let Book = require('../models/book.js');
let Comment = require('../models/comment.js');
let server = require('../server.js');
chai.use(chaiHttp);
let should = chai.should();

let dummyData = {
    title: 'lorem ipsum dolor sit'
}
const ROUTE = '/api/book';
beforeEach((done) => {
    Book.deleteMany({}, (err) => {
        Comment.deleteMany({}, (err) => {
            done();
        });
    });
});

describe('get books', () => {

    it('should get all books', async (done) => {
        let b = new Book(dummyData);
        await b.save();
        b = new Book(dummyData);
        await b.save();
        let c = new Comment({
            comment: 'this is a comment',
        });
        c.save();
        b.comments = [];
        b.comments.push(c._id);
        await b.save();

        chai.request(server).get(ROUTE).end((req, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.all.have.property('commentcount');
        });
    });
});

describe('add book', () => {

    it('should add a book', async (done) => {
        chai.request(server).post(ROUTE).send(dummyData).end((req, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        });
    });
});


describe('delete all ', () => {

    it('should delete all books', (done) => {
        chai.request(server).delete(ROUTE).end((req, res) => {
            res.should.have.status(200);
            res.body.should.be.a('string').eql('deleted all books');
            done();
        });
    });
});