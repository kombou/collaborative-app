const modelRepository = require('./../repository/ModelRepository');
const chatRepository = require('./../repository/chatRepository');
const userRepository =require('./../repository/AccountRepository');
let statisticController = {};

statisticController.getAllUser= (req, res) => {
       userRepository.findAll().then((users)=>{res.send(users);}).catch((err)=>{console.log('error find all user '+err);});
};
statisticController.getAllMessages= (req, res) => {
    chatRepository.findAll().then((messages)=>{res.send(messages);}).catch((err)=>{console.log('error find all user '+err);});
};
statisticController.getAllMessagesProject= (req, res) => {
    chatRepository.findByIdProjet(req.params.id).then((Project_messages)=>{res.send(Project_messages);}).catch((err)=>{console.log('error find all user '+err);});
};
module.exports = statisticController;