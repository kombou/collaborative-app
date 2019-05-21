const express = require("express");
const router = express.Router();
const datas = require("./data");


const checkAuth = require('./../middleware/check-auth');

const extractionController = require('./../controller/ExtractionController');


router.get('/', checkAuth, (req, res) => {
    res.render("extraction.ejs", { data: datas.lire, user: req.session.user });

});

router.get("/getData/:id", (req, res) => {

    extractionController.getDoc(req, res).then((result) => {
        res.send(result);
    })
});

module.exports = router;