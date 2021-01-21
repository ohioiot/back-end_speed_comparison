




var mqtt = require(require('os').homedir()+'/mqtt')('larry');


let analysisArray = [], start, hldr;


mqtt.subscribe('larry/response');

setInterval(function() {
	start = process.hrtime();
	mqtt.publish('larry/find', JSON.stringify({code: "jcz32wj9zrz105a7"}));
}, 1000);


mqtt.on('message', () => {
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
