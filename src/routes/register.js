var express = require('express');
var router = express.Router();

const accountController = require("./../controller/AccountController");

router.get('/', function(req, res) {
    res.render('register.ejs');
});

router.post('/registration', accountController.create);

module.exports = router;