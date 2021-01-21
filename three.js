

console.log('\n\nwait');


setTimeout(function() {

	console.log('\n\nstart');
	setTimeout(() => {


		console.log("\n\nstop");

	}, 3)

}, 1000);
	