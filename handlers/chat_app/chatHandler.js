module.exports = (io, socket) => {
   
    //message util
    const formatMessage = require('../../utils/messages');
    //users util
    const {userJoin, getCurrentUser,userLeave, getRoomUsers} = require('../../utils/users');
    //name
    const bot = 'Supervisor Bot'
    
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);
    
        socket.join(user.room)
    
        //message only to user that joined
        socket.emit('message', formatMessage(bot, `Welcome to WebChat, You have successfully connected to ${user.room}!`));
    
        //message to all except user that joined
        socket.broadcast.to(user.room).emit('message', formatMessage(bot, `${user.username} has joined the chat!`) );
        
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      })
    
      console.log("client connected to WS");
    
      //listen for messages
      socket.on('chatMessage', (msg) => { 
        const user = getCurrentUser(socket.id)
    
        io.to(user.room).emit('message', formatMessage(user.username,  msg));
    
      });
      
      //when user leaves
      socket.on('disconnect', () => {
        const user = userLeave(socket.id);
    
        if(user) {
          io.to(user.room).emit('message', formatMessage(bot, `${user.username} left the chat`));
    
          // Send users and room info
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        }
      });


};
