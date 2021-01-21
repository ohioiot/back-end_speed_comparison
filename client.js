

var io = require('socket.io-client');

let total = 5;

for (var i=0; i<total-1; i++) {
	let temp = io.connect("http://localhost:1688", {reconnect: true});
	temp.on('connect', function() {	console.log("connected:", temp.id); })
	temp.on('disconnect', function() { console.log("disconnected temp"); })
};

var socket = io.connect("http://localhost:1688", {reconnect: true});


let analysisArray = [], start, hldr;


socket.on('connect', function() {
	console.log("-- connected:", socket.id);

	hldr = setInterval(function() {
		start = process.hrtime();
		socket.emit('find', {code: "jcz32wj9zrz105a7"});
	}, 10);

	socket.on('response', function(packet) {
		let clock = process.hrtime(start)[1]/1000000;
		if (clock<0) { console.log("ERROR!", end, start, clock); }
		clock = clock.toFixed(2);
		analysisArray.push(Number(clock));
		if (analysisArray.length > 500) analysisArray.shift();
		let total = 0;
		analysisArray.forEach(function(elem) { total+=elem; });
		let avg = total/(analysisArray.length);
		console.log(analysisArray.length+ ": "+avg.toFixed(2));
	});

});


socket.on('disconnect', function(id) {
    console.log("-- disconnecting:", id);
    socket.removeListener('response');
   	clearInterval(hldr);
});
