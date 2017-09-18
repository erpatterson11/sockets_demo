const express = require('express')
const app = express()
    // http is native to Node.js
const http = require('http').Server(app)
const io = require('socket.io')(http)


app.use(express.static(__dirname))

// io.on is an event listener. listens for a user to connect
io.on('connection', function(socket) {
    // event listener for a chat message. emited on client side
    socket.on('chat message', function(msg, user) {

       console.log("msg received", msg, user)
       
        // rebroadcasts message to everyone upon receipt
        io.emit('chat message', msg, user)
    })
    console.log("user connected")
    // event listener for user disconnect. lets everyone know when someone logged off
    socket.on('disconnect', function(user) {
        io.emit('user disconnected', {msg: user + " disconnected"})
        console.log("user disconnected");
    })
})


// note that the listen is on http and NOT on app
http.listen(3000, () => console.log("listening on port 3000"))
