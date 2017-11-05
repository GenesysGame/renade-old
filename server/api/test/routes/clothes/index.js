module.exports.get = function(request, response){
	let temp = {
		name: "name of the preset"
	};
	response.json(temp);
	response.end();
};