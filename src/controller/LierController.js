const lierRepository = require('./../repository/LierRepository');
//const User = require('./../entity/user');


let lierController = {}

/*lierController.save = (req, res) => {


    if (req.body.id_project === null || req.session.user === undefined) {
        req.flash("error", "Invitation : tous les parametres sont requis ");
        return;
    }

    const liaison= {
        id_projet: req.params.idProject,
        id_user: req.params.idUser,
        statut: 1,
        is_valid: false
    };


    associerRepository.save(association).then((result) => {
        res.send(association.id_user);

        console.log("association saved succesfully ");
    }).catch((err) => {
        console.log("association save error");
        res.send("error");
        console.log(err);
    });

};*/
lierController.findAllProjects = (req, res) => {
    return new Promise((resolve, reject) => {
        if (req.session.user === undefined) {
            req.flash("error", "liste des projects : tous les parametres sont requis ");
            reject("liste des projects : tous les parametres sont requis ")
        }
        lierRepository.findAllModelProject(req.session.user.id).then((result) => {
            console.log("association find succesfully ");
            resolve(result);

        }).catch((err) => {
            res.send(err);
            console.log("association save error");
            console.log(err);
            reject(err);
        });

    });



};
module.exports = associerController;