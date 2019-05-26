var express = require('express');
var router = express.Router();
const Auth = require("./../middleware/check-auth");
const associerRepository = require('./../repository/AssocierRepository');

/* GET home page after connection */
router.get('/', Auth ,function(req, res, next) {
    res.render('accueil.ejs', { title: 'Dashboard' , user: req.session.user });
});
router.get('/project',Auth, function(req, res, next) {


    associerRepository.findAllUserProjet(req.session.user.id).then((project) => {
        console.log("hhh");
        console.log(project);
        if (project.length > 0) {

            res.render('projectList.ejs', { title: 'Workspace', projects: project, user: req.session.user });

        } else {
            res.redirect("/accueil");
        }


    }).catch(function(err) {
        console.log(err);
    });;
});

module.exports = router;