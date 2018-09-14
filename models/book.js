var mongoose = require('mongoose');


var schema = new mongoose.Schema({
  title: String,

});

module.exports = mongoose.model('book', schema);