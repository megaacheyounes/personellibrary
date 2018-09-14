var mongoose = require('mongoose');

let schema = new mongoose.Schema({
    comment: String,
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    }
});

module.exports = mongoose.model('comment', schema);