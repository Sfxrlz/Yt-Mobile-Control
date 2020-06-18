var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var internalIp = require("internal-ip");
const port = process.env.PORT || 2009;

app.use('/static', express.static('./nPart/'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/nPart/index.html');
});

app.get('/ctrl', function(req, res){
  res.sendFile(__dirname + '/nPart/ctrl.html');
});


io.on('connection', function(socket){
  	socket.on('cmd', function(msg){
    	io.emit('cmd', msg);
  	});
});

io.on('connection', function(socket){
  	socket.on('pse', function(){
    	io.emit('pse');
  	});
});

io.on('connection', function(socket){
  	socket.on('volUp', function(){
    	io.emit('volUp');
  	});
});

io.on('connection', function(socket){
  	socket.on('volDown', function(){
    	io.emit('volDown');
  	});
});

http.listen(port, function () {
    var localIP = internalIp.v4.sync();
    console.log('Webserver läuft und hört auf ' + localIP + ':' + port);
});
