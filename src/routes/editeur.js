var express = require('express');
var r = require("rethinkdb");
var http = require("http").Server(express());
var io = require("socket.io")(http)

var router = express.Router();

//connection a la base de donnée 
/*router.use((req, res, next) => {
  r.connect({ host: "localhost", port: 28015 }, function(err, conn) {
    if (err) throw err;
    req.con = conn;
  });
  next();
})

//creation de la table si elle n'existe pas
router.use((req,res,next) => {
  r
  .db("test")
  .tableList()
  .run(req.con, function(err, response) {
    if (response.indexOf("edit") > -1) {
      console.log("Table exists, skipping create...");
      console.log("Tables - " + response);
    } else {
      console.log("Table does not exist. Creating");
      r
      .db("test")
      .tableCreate("edit")
      .run(req.con);
    }
  });
  next();
});*/

/* GET editeur page. */
router.get('/', function(req, res, next) {
  res.render('editeur.ejs');
});


module.exports = router;
