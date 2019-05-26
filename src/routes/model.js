var express = require('express');
var router = express.Router();
const checkAuth = require("./../middleware/check-auth");
const modelController = require('./../controller/ModelController');
const statisticController = require('./../controller/statisticControler');


/* GET model page. */
router.post('/regex', modelController.createRegexModel);
router.post('/hmm', modelController.createHmmModel);
router.get('/search/:id', modelController.searchModelOnProject);
router.get('/searchModelProject/:id', modelController.searchModelProject);
router.get('/searchAllModel', modelController.searchAllModel);
router.get('/getAllUsers', statisticController.getAllUser);
router.get('/getAllMessages', statisticController.getAllMessages);
router.get('/getAllMessagesProject/:id', statisticController.getAllMessagesProject);
module.exports = router;