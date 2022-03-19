module.exports = (io, socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)

    
        socket.on('disconnect', () => {
          socket.to(roomId).emit('user-disconnected', userId)

        })
      })
}