//import express app
const app = require('./app');
//secret variables
require('dotenv').config()
//http
const http = require('http');
//create port
const port = process.env.PORT || 3030;

// todo
// add mute and mut video btn in videochat

//importing all Logic needed for specific app
const ChatAppLogic = require('./handlers/chat_app/chatHandler');
const VideoAppLogic = require('./handlers/video_app/videoHandler')
//server creation
const server = http.createServer(app);

server.listen( port, () => {
  console.log('Listening on port ' + port);
})

//socket creation
const socketIo = require('socket.io');
const io = socketIo(server);


const onConnection = (socket) => {
  //all apps that launch on connection
  ChatAppLogic(io,socket);
  VideoAppLogic(io,socket);
};

//socket connection
io.on('connection', onConnection);