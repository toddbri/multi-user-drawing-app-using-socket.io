const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));

io.on('connection', function(socket){

  socket.on('drawing', function(data){
      socket.broadcast.emit('drawing',data);
  });

});

var port = 5003;
http.listen(port, function(){
  console.log('listening on port: ' + port);
});
