var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname,'index.html'));
});

io.on('connection', function(socket){
  console.log('a user connected');
 
  socket.on('chat message', function(msg){
    console.log('message: ' + msg); 
     io.emit('chat message', "server said <b>" + msg + "</b>");
  });
 
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});