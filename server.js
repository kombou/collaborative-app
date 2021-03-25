const express = require("express");
const db = require("./src/middleware/db");
//appRouter
const app = require("./src/app");

const extractionEmiter = require("./src/io/extraction.io");
const chatEmitter = require('./src/io/chat.io');

const http = require("http").Server(app);

const io = require('socket.io')(http);



let ioExtraction = io.of("/extraction");
let ioChat = io.of("/chat");

ioExtraction.on("connection", (socket) => {
    extractionEmiter.repond(socket, ioExtraction);
});

ioChat.on("connection", (socket) => {
    //chatEmitter.repond(socket,ioChat);
    io.on('sending', function(data) {
        io.emit('sending', data);
        console.log(data)
    });
});


db.initTable();

const port = process.env.PORT || 3005;


// Setup Express Listener
http.listen(port, "0.0.0.0", function() {
    console.log(`listening on: localhost:${port}`);
});
