'use strict';

//Loading dependencies & initializing express
var express = require('express'); 
var app = express();
var socketIO = require('socket.io');//for signalling in WebRTC
var http = require('http');
var os = require('os');

//Folder containing JS for frontend
app.use(express.static('public'))

//Define a route 
app.get("/", function(req, res){
	res.render("index.ejs");
});

//Initialize http server and associate it with express
var server = http.createServer(app);


server.on('listening',function(){
    console.log('ok, server is running');
});

//Ports on which server should listen
server.listen(process.env.PORT || 8000);

//Initialize socket.io
var io = socketIO(server);

io.sockets.on('connection', function(socket) {
	// To push all the arguments of log() in array, we have to use apply().
	function log() {
	  var array = ['Message from server:'];
	  array.push.apply(array, arguments);
	  socket.emit('log', array);
	}
  
    
    //Defining Socket Connections
    socket.on('message', function(message, room) {
	  log('Client said: ', message);
	  // for a real app, would be room-only (not broadcast)
	  socket.in(room).emit('message', message, room);
	});
	socket.on('create or join', function(room) {
	  log('Received request to create or join room ' + room);

	var clientsInRoom = io.nsps['/'].adapter.rooms[room];
	var totalClients = clientsInRoom === undefined ? 0 : Object.keys(clientsInRoom.sockets).length;
	
	//max 2 clients
	if (totalClients === 2) {
	  socket.emit('full', room);
	  return;
	}
	
	log('Room ' + room + ' now has ' + (totalClients + 1) + ' client(s)');
	
	if (totalClients === 0) {
	  socket.join(room);
	  log('Client ID ' + socket.id + ' created room ' + room);
	  socket.emit('created', room, socket.id);
	
	} else {
	  log('Client ID ' + socket.id + ' joined room ' + room);
	  io.sockets.in(room).emit('join', room);
	  socket.join(room);
	  socket.emit('joined', room, socket.id);
	  io.sockets.in(room).emit('ready');
	}

	});
	
  
	socket.on('ipaddr', function() {
	  var ifaces = os.networkInterfaces();
	  for (var dev in ifaces) {
		ifaces[dev].forEach(function(details) {
		  if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
			socket.emit('ipaddr', details.address);
		  }
		});
	  }
	});
  
	socket.on('bye', function(){
	  console.log('bye');
	});
  
});