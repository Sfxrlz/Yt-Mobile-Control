var express = require('express');
var app = require('express')();
const http = require('http').Server(app);
//const internalIp = require("internal-ip");
const port = process.env.PORT || 2009;
let io = require('socket.io')(http);
const router = express.Router()

app.use('/static', express.static('./nPart/'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/nPart/index.html');
});

app.get('/ctrl', function (req, res) {
	res.sendFile(__dirname + '/nPart/ctrl.html');
});

app.get('/main', function(req, res){
	res.sendFile(__dirname + '/nPart/main.html');
});

app.get('/style', function(req,res){
	res.sendFile(__dirname + '/nPart/css/style.css');
})

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
	socket.on('nxV', function () {
		io.emit('nxV');
	});
});

app.use('/', router);
http.listen(port, function () {
	//var localIP = internalIp.v4.sync();
	console.log('Server Instance Running on: ' /*+ localIP */+ port);
});