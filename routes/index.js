var express = require('express');
var goodGuy = require('good-guy-http')({
    maxRetries: 3
});
var jp = require('jsonpath');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}).get('/book/:isbn', function(req, res, next) {
    var isbn = req.params.isbn;

    goodGuy('https://book-catalog-proxy-2.herokuapp.com/book?isbn=' + isbn).then(function (response) {
        if (response.statusCode == 200) {
            var book = JSON.parse(response.body).items[0];

            res.render('book', {
                title: jp.query(book, '$..title'), //book.volumeInfo.title,
                cover: jp.query(book, '$..thumbnail'), //book.volumeInfo.imageLinks.thumbnail
                partials: {
                    layout: 'layout'
                }
            });
        }
    });
});

module.exports = router;
