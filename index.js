const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const internalIp = require("internal-ip");
const port = process.env.PORT || 2009;
let io = require('socket.io')(http);

app.use('/static', express.static('./nPart/'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/nPart/index.html');
});

app.get('/ctrl', function (req, res) {
	res.sendFile(__dirname + '/nPart/ctrl.html');
});

io.on('connection', function (socket) {
	socket.on('pse', function () {
		io.emit('pse');
	});
	socket.on('chV', function (link) {
		io.emit('chV', link);
	});
	socket.on('vUp', function () {
		io.emit('vUp');
	});
	socket.on('vDw', function () {
		io.emit('vDw');
	});
	socket.on('liV', function (link) {
		io.emit('liV',link);
	});
});

http.listen(port, function () {
	var localIP = internalIp.v4.sync();
	console.log('Server Instance Running on: ' + localIP + ':' + port);
});