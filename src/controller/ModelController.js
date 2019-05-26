const modelRepository = require('./../repository/ModelRepository');
const projectRepository = require('./../repository/ProjetRepository');
const lierRepository = require('./../repository/LierRepository');
let modelController = {}

modelController.createRegexModel = (req, res) => {
    if (req.body.language === null || req.body.definition === null || req.body.description === null || req.body.id_project === null) {
        req.flash("error", "Certains champ son vide");
        res.redirect("/model");
    }
    const model = {
        id_projet: req.body.id_projet,
        type: req.body.type,
        definition: req.body.definition,
        language: req.body.language,
        description: req.body.description,
        date_created: new Date()
    };
    console.log(model);
    modelRepository.findByLanguageAndTypeDefinition(req.body.type, req.body.language, req.body.definition).then((modelisation) => {
        console.log(modelisation);
        if (modelisation === undefined) {
            modelRepository.save(model).then((result) => {
                console.log('modele created sucefully');
                let lier = {
                    id_projet: req.body.id_projet,
                    id_model: result.generated_keys[0],
                    date_created: new Date()
                };
                lierRepository.save(lier).then((result) => {
                    console.log('liaison sauvegarder avec success!');
                    res.redirect('/accueil/project');
                }).catch((err) => {
                    req.flash('erreur', err);
                    res.redirect('/erreur');
                });
            }).catch((err) => {
                req.flash("error", err);
                res.redirect("/erreur");
            });
        } else {
            req.flash("error", "Ce model existe deja !");
            res.redirect('/accueil/project');
        }
    });
};

modelController.createHmmModel = (req, res) => {
    if (req.body.language === null || req.body.pre === null || req.body.post === null || req.body.target === null || req.body.other === null || req.body.id_project === null) {
        req.flash("error", "Certains champ son vide");
        res.redirect('/accueil/project');
    }
    let model = {};
    let definition = {
        pre: req.body.pre,
        post: req.body.post,
        target: req.body.target,
        other: req.body.other
    };
    if (req.body.file_training === '' || req.body.algo_training === '') {
        model = {
            id_projet: req.body.id_projet,
            type: req.body.type,
            description: req.body.description,
            definition: definition,
            language: req.body.language
        };
    } else {
        model = {
            id_projet: req.body.id_projet,
            type: req.body.type,
            description: req.body.description,
            definition: definition,
            language: req.body.language,
            file_training: req.body.file_training,
            algo_training: req.body.algo_training
        };
    }

    console.log(model);

    modelRepository.findForHmmModel(req.body.type, req.body.language, definition).then((modelisation) => {
        console.log(modelisation);
        if (modelisation === undefined) {
            modelRepository.save(model).then((result) => {

                console.log('modele created sucefully');
                let lier = {
                    id_projet: req.body.id_projet,
                    id_model: result.generated_keys[0],
                    date_created: new Date()
                };
                lierRepository.save(lier).then((result) => {
                    console.log('liaison sauvegarder avec success!');
                    res.redirect('/accueil/project');
                }).catch((err) => {
                    console.log(err);
                    res.redirect('/erreur');
                });
            }).catch((err) => {
                req.flash("error", err);
                res.redirect('/erreur');
            });
        } else {
            req.flash("error", "Ce model existe deja !");
            res.redirect('/accueil/project');
        }
    });
};

modelController.modelOnProject = (req, res) => {
    projectRepository.findByIdProjet(req.params.id).then((project) => {
        console.log(project);
        lierRepository.findAllModelProjet(project.id).then((model) => {
            console.log(model);
            res.render("model.ejs", { userss: req.session.user, project: project, room: req.params.id, user: req.session.user, model: model });
        }).catch((err) => {
            res.send(err);
            console.log("111");
            console.log(err);
        });
    }).catch((err) => {
        res.send(err);
        console.log("An error occur during the create projectting project");
        console.log(err);
    });
};

modelController.searchModelProject = (req, res) => {
    projectRepository.findByIdProjet(req.params.id).then((project) => {
        console.log(project);
        lierRepository.findAllModelProjet(project.id).then((model) => {
            console.log(model);
            res.send(model);
        }).catch((err) => {
            res.send(err);
            console.log("111");
            console.log(err);
        });
    }).catch((err) => {
        res.send(err);
        console.log("An error occur during the create projectting project");
        console.log(err);
    });
};

modelController.searchAllModel= (req, res) => {
    modelRepository.findAll().then((model) => {
        console.log(model.length);
        res.send(model);
    }).catch((err) => {
        res.send(err);
        console.log("An error occur during find all model for statistic");
        console.log(err);
    });
};

modelController.searchModelOnProject = (req, res) => {
    projectRepository.findByIdProjet(req.params.id).then((project) => {
        console.log(project);
        lierRepository.findAllModelProjet(project.id).then((model) => {
            console.log(model);
            res.send(model);
        }).catch((err) => {
            res.send(err);
            console.log("111");
            console.log(err);
        });
    }).catch((err) => {
        res.send(err);
        console.log("An error occur during the create projectting project");
        console.log(err);
    });
};

module.exports = modelController;