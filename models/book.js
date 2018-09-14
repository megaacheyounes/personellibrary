var mongoose = require('mongoose');


var schema = new mongoose.Schema({
  title: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }]

});

module.exports = mongoose.model('book', schema);