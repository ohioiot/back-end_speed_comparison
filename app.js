



// HTTP
const express = require('express');
const app = express();
const server = require('http').createServer(app);
var bodyParser = require('body-parser')
let port = 1688;

// SOCKET.IO
const io = require('socket.io')(server);

// MQTT
var mqtt = require(require('os').homedir()+'/mqtt')('larry');




let choice = Number( (Math.random()*1000).toFixed(0) );;
let users = require('./makeUsers')();
users[choice].code = "jcz32wj9zrz105a7";



// HTTP
	app.use(bodyParser.json())

	app.post('/users', (req,res,next) => {
		let target = users.find(function(user) { return user.code == req.body.code; });
		res.json({target, choice});
		next();
	})

	app.use('/', (req, res, next) => {
		users[choice].code = "nothing";
		choice = Number( (Math.random()*1000).toFixed(0) );
		users[choice].code = "jcz32wj9zrz105a7";
	})



// MQTT
	mqtt.subscribe('larry/find');

	mqtt.on('message', (topic, payload) => {
		let code = JSON.parse(payload.toString());
		let target = users.find(function(user) { return user.code == code; });
		mqtt.publish('larry/response', JSON.stringify({target, choice}));
		users[choice].code = "nothing";
		choice = Number( (Math.random()*1000).toFixed(0) );
		users[choice].code = "jcz32wj9zrz105a7";
	})



// SOCKET.IO
	io.on('connection', function(socket) {
		console.log("connected:", socket.id);

		socket.on('find', function(packet) {
			let target = users.find(function(user) { return user.code == packet.code; });
			io.emit('response', {target, choice});
			users[choice].code = "nothing";
			choice = Number( (Math.random()*1000).toFixed(0) );
			users[choice].code = "jcz32wj9zrz105a7";
		})

		socket.on('disconnect', function(g) {
			console.log("do we get g", g);
		})
	})









server.listen(port, (err) => {	
	if (err) console.log(err);
	console.log('port ' + port + ' is open for business!'); 
})

