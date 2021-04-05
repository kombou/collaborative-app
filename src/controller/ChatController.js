const chatRepository = require('./../repository/chatRepository');




let chatController = {};


chatController.saveMessage = (req, res) => {


    if (req.body.message === null || req.body.id_project === null || req.session.user === undefined) {
        req.flash("error", "chatSendError : tous les parametres sont requis ");
        return;
    }

    const message = {
        id_project: req.body.id_project,
        id_user: req.session.user.id,
        message: req.body.message
    };


    chatRepository.save(message).then((result) => {
        console.log("message saved succesfully ");
    }).catch((err) => {
        console.log("message save error");
        console.log(err);
    });

};


chatController.findAllMessages = (req, res) => {

    if (req.params.id_project === null) {
        req.flash("error", "chatSendError : tous les parametres sont requis ");
        return;
    }

    chatRepository.findByIdProjet(req.params.id_project).then((result) => {
        console.log("messages read succesfully ");
        res.send(result);
    }).catch((err) => {
        console.log("An error occur during the reading of messages");
        console.log(err);
    });

};
module.exports = chatController;