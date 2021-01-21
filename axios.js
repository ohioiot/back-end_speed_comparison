

const axios = require('axios');


let analysisArray = [];
let start = null;


setInterval(function() {
	start = process.hrtime();
	axios.post('http://localhost:1688/users', {code: "jcz32wj9zrz105a7"})
	.then(function(result) {
		let clock = process.hrtime(start)[1]/1000000;
		if (clock<0) { console.log("ERROR!", end, start, clock); }
		clock = clock.toFixed(2);
		analysisArray.push(Number(clock));
		if (analysisArray.length > 500) analysisArray.shift();
		let total = 0;
		analysisArray.forEach(function(elem) { total+=elem; });
		let avg = total/(analysisArray.length);
		console.log(analysisArray.length+ ": "+avg.toFixed(2));
	})
}, 10)	


