var express = require('express');
var goodGuy = require('good-guy-http')({});
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
}).get('/book/:isbn', function(req, res, next) {
    var isbn = req.params.isbn; //0596805527

    goodGuy('https://book-catalog-proxy-2.herokuapp.com/book?isbn=' + isbn).then(function (response) {
        if (response.statusCode == 200) {
            var body = JSON.parse(response.body);

            res.render('book', {
                book: body.items[0]
            });
        }
    });
});

module.exports = router;
