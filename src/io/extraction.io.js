const extractionController = require('./../controller/ExtractionController')
const chatRepository = require('./../repository/chatRepository')


module.exports.repond = (socket, io) => {

    console.log("User Connected of extraction io");

    socket.on("disconnect", () => {
        console.log("User disconnect");
    });

    socket.on("document-update", (msg) => {
        extractionController.save(msg).then((res) => {
            extractionController.edit().then((row) => { io.emit("doc", row) });
        }).catch((err) => {
            console.log(err);
        })
    });
    socket.on("document-update", (msg) => {
        extractionController.save(msg).then((res) => {
            extractionController.edit().then((row) => { io.emit("doc", row) });
        }).catch((err) => {
            console.log(err);
        })
    });



    io.on("documents", () => {
        extractionController.getAll().then((docs) => {
            return docs;
        });
    });
    socket.on('sending', function(data) {
        chatRepository.save(data).then((res) => {
            io.emit('sending', data);
        });

    });

    //send the name of the person who tping
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
};