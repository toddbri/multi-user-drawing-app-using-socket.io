const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};
app.use(express.static('public'));

var colorlist = ['aqua', 'blue','brown','chartreuse','coral','crimson','darkgreen','darkmagenta','darkolivegreen','darkturquoise','darkviolet','gold','indigo','lightblue','lime','orange','peru','tomato','violet'];


io.on('connection', function(socket){

  socket.on('drawing', function(data){

      console.log('data: ' + data);
      console.log('startx: ' + data.startx);
      socket.broadcast.emit('drawing',data);

  });

  socket.on('login', function(message){
      var newcolor = pickAColor();
      console.log("color sent: " + newcolor);

      socket.emit('login',{color: newcolor});

  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    var message = socket.username + " has left...";
    message = message.toUpperCase();
    console.log('user disconnet message: ' + message);
    if (socket.username !== undefined){
      io.emit('newuser',message);
      updateuserlist();
    }

  });
  socket.on('typing', function(){
    io.emit('typing',socket.username + ' is typing a message');
  });

  socket.on('chat message', function(msg){
    if (socket.username !=='undefined'){
      console.log('message: ' + msg);
      data = {username: socket.username, color: socket.color, message: msg};
      io.emit('chat message', data);
    }

  });
});


http.listen(8000, function(){
  console.log('listening on *:3000');
});

function pickAColor(){
  var num = parseInt(Math.random() * colorlist.length);
  return colorlist[num];
}
