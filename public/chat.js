//Make connection 
var path = window.location.origin

// As we have loaded it in the library in index.html we have access to the io variable. 
var socket = io.connect(path)

var handle = document.getElementById("handle")
    message =  document.getElementById("message")
    btn = document.getElementById('send')
    output = document.getElementById("output")
    feedback = document.getElementById("feedback")

//Emit Events
btn.addEventListener('click',function(){
    socket.emit('chat',{
        message : message.value,
        handle :handle.value
    })
}) 

message.addEventListener('keypress',function(){
    socket.emit('typing',{
        message : handle.value + " is typing"
    })
})

//Listen For Events
socket.on('chat',function(data){
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>'
    feedback.innerHTML = ''
})

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>' + data.message + '...</em></p>'
})