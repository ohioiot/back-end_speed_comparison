


module.exports = function() {

	let users = [];

	

	// let start = new Date();

	for (var i = 0; i<10000; i++) {
		users.push( {name: code(), code: code(), group: code(), socketID: code() });
	}

	// let end = new Date();

	// console.log("it took:", (end-start) );

	// console.log(users);

	function code() {
		let code_length = 16;
		const chars = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
		let code = new Array(code_length).fill(null).map(() => {
		        return chars[Math.floor(Math.random() * chars.length)];
		}).join("");
		return code;
	}


	return users;


}
