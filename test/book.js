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
const ROUTE = '/api/book/';
beforeEach((done) => {
    Book.remove({}, (err) => {
        done();
    });
});
describe('/GET', () => {

    it('should return a book', (done) => {
        var b = new Book(dummyData);
        b.save(() => {
            chai.request(server).get(ROUTE + b._id).end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql(b.title);
                done();
            });
        });
    });
});

describe('/post', () => {

    it('should add a comment to a book', (done) => {

        var b = new Book(dummyData);

        let commentData = {
            comment: 'this is a comment!'
        }

        b.save(() => {
            commentData.book = b._id;
            chai.request(server).post(ROUTE + b._id).send(commentData).end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('comment').eql(commentData.comment);
                done();
            })
        });
    });
});

describe('/DELETE', () => {

    it('should delete the book ', (done) => {

        let b = new Book(dummyData);
        b.save(() => {
            chai.request(server).delete(ROUTE + b._id).end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('string').eql('delete successful');
                done();
            });
        });
    });
});