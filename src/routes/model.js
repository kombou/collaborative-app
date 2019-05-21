var express = require('express');
var router = express.Router();
const checkAuth = require("./../middleware/check-auth");

/* GET model page. */
router.get('/', checkAuth,function(req, res) {
  res.render('model.ejs');
});

module.exports = router;
