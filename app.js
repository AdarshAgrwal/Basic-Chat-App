var express = require("express")
var socket = require("socket.io")

var app = express()

var port = process.env.PORT || 3000

var server = app.listen(port, (err,req)=>{
    console.log("The application was started at " + port)
})

//static
app.use (express.static('public'))

//socket setup 
var io = socket(server)

io.on("connection",(socket)=>{
    console.log("the socket was formed between client and server",socket.id)
    
    socket.on('chat',function(data){
        io.sockets.emit('chat',data)
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })
})