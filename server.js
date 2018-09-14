// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var helmet = require('helmet');
var controller = require('./controller.js');
var bodyParser = require('body-parser');
controller.connect();
app.use(helmet.hidePoweredBy({
  setTo: 'PHP 4.2.0'
}));

app.use(helmet.noCache());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.route('/api/book')
  .get(controller.getBooks)
  .post(controller.addBook)
  .delete(controller.deleteBooks);

app.route('/api/book/:_id')
  .get(controller.getBook)
  .delete(controller.deleteBook)
  .post(controller.addComment);

app.get('/', function (request, response) {

});

// listen for requests :)
let port = process.env.PORT | 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
module.exports = app;