var express = require('express');
var router = express.Router();
const projectController = require("./../controller/ProjectController");


/* GET Chat page. */
router.get('/', function(req, res) {
  res.render('chat.ejs');//changer le nom chat.ejs pour le nom di fichier .ejs auquel il est associé
});

router.post('/save', projectController.createProject);
router.get('/extractionData/:id', projectController.userOnProject);

module.exports = router;