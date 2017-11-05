module.exports.get = function(request, response){
	response.header('Content-Type', 'application/json');
	response.header("Access-Control-Allow-Origin", "*");
	let temp = [];
	temp.push({name: "name of the preset 1"});
	temp.push({name: "name of the preset 2"});
	response.json(temp);
	response.end();
};

module.exports.delete = function(request, response){
	response.header('Content-Type', 'application/json');
	response.header("Access-Control-Allow-Origin", "*");
	response.end('debug delete');
};

module.exports.put = function(request, response){
	response.header('Content-Type', 'application/json');
	response.header("Access-Control-Allow-Origin", "*");
	response.end('debug put');
};