module.exports.repond = (socket, io) => {

    console.log("User Connected for chat io");
    //send message to all clients
    socket.on('sending', function(data) {
        io.emit('sending', data);
        console.log(data)
    });

    //send the name of the person who tping
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
};