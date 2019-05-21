var express = require('express');
var router = express.Router();
const chatController = require("./../controller/ChatController");

/* GET Chat page. */
router.get('/', function(req, res) {
  res.render('chat.ejs');
});

router.post('/save', chatController.saveMessage);

router.get('/getData/:id_project', chatController.findAllMessages);

module.exports = router;
