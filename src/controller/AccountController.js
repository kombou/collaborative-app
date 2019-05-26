const accountRepository = require('./../repository/AccountRepository');
const associerRepository = require('./../repository/AssocierRepository');
const User = require('./../entity/user');

const associerController = require('./AssocierController');



let accountController = {}

accountController.create = (req, res) => {

    if (req.body.email === null || req.body.password === null || req.body.username === null) {
        req.flash("error", "Certains champ son vide");
        res.redirect("/registration");
    }

    const account = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    };

    console.log(account);
    accountRepository.findByEmail(account).then((user) => {
        if (user === undefined) {
            accountRepository.save(account).then((result) => {
                res.redirect("/user");
            }).catch((err) => {
                req.flash("error", err);
                res.redirect("/user");
            });
        } else {
            req.flash("error", "Cet Email est déjà utilisée");
            res.redirect("/user");
        }
    });
};

accountController.login = (req, res) => {
    let account = new User({
        email: req.body.email,
        password: req.body.password
    });
    if (req.body.email === undefined || req.body.password === undefined) {
        req.flash("error", "Certains champ son vide");
        res.redirect("/registration");
    }

    accountRepository.findByEmail(account).then((user) => {
        console.log(user);
        if (user === undefined) {
            req.flash("error", "Cet Email est incorrect");
            res.redirect("/user");
        }

        if (user.password !== req.body.password) {
            req.flash("error", "Ce Mot de passe est incorrect");
            res.redirect("/user");
        }
        req.session.user = user;

        res.redirect("accueil/project");

    });
};

accountController.logout = (req, res) => {
    req.session.user = undefined;
    res.redirect("/user")
};

accountController.searchByKeyword = (req, res) => {
    accountRepository.matchUser(req.params.keyword).then((users) => {
        res.render("partials/search-participants", { users: users, user: req.session.user });

    });
};
module.exports = accountController;