let Book = require('./models/book.js');
let Comment = require('./models/comment.js');
//let DB = require('./env.js');
let mongoose = require('mongoose');
let controller = {};
controller.getBook = (req, res) => {
    let _id = req.params._id;
    Book.findById(_id).populate('comments').exec((err, book) => {
        res.json(book);
    });
};
controller.getBooks = (req, res) => {
    Book.aggregate([{
        $project: {
            "_id": 1,
            "title": 1,
            "comment_count": {
                $size: "$comments"
            }
        }
    }, ]).exec((err, books) => {
        res.json({
            books
        })
    });
};
controller.deleteBooks = (req, res) => {
    Book.deleteMany().exec((err, ress) => {
        console.log('err', err);
        if (err)
            return res.status(400).json(err);
        res.json('deleted all books');
    });
};
controller.addBook = async (req, res) => {
    let b = new Book(req.body);
    await b.save();
    res.json(b);
};

controller.deleteBook = async (req, res) => {
    let _id = req.params._id;
    await Book.findByIdAndRemove(_id).exec();
    res.json('delete successful');
};
controller.addComment = async (req, res) => {

    let b = await Book.findById(res.params_id).populate('comments').exec();
    let c = new Comment(req.body);
    await c.save();
    b.comments.push(c._id);
    await b.save();
    return res.json(b);
};
controller.connect = () => {
    //mongoose.connect(DB);
    mongoose.connect(process.env.DB);
}
module.exports = controller;