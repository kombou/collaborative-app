var express = require('express');
var router = express.Router();
var r = require("rethinkdb");

/* GET user page. */

router.get('/', function(req, res, next) {
  res.render('login.ejs');
});

r.connect({ host: "localhost", port: 28015 }, function(err, conn){
    router.post("/", (req,res,next) => {
        r
        .db("test")
        .table('users')
        .getAll(req.body.email, { index: 'email' })
        .filter({ email: req.body.email, password: req.body.password })
        .run(conn)
        .then(function(cursor) {
            return cursor.toArray()
                .then(function(users) {
                    if (users.length > 0) {
                        req.session.user = users[0];
                        res.redirect('/index');
                    } else {
                        res.redirect('/');
                    }
                });
        })
        .catch(function(err) {
            console.log('Error witch bd', err);
            res.redirect('/');
        });
    });
});
module.exports = router;
