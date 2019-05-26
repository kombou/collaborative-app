var express = require('express');
var router = express.Router();
const not_Auth = require("./../middleware/not-auth");

const accountController = require("./../controller/AccountController");

/* GET login page. */
router.get('/', not_Auth, function(req, res) {
    res.render('login.ejs');
});

/*router.get('/registration', function(req, res) {
    res.render('register.ejs');
});*/

router.get('/logout', accountController.logout);


router.get('/search-user/:keyword', accountController.searchByKeyword);

router.post('/', accountController.login);


router.post('/registration', accountController.create);

module.exports = router;