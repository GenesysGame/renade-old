module.exports.get = function(request, response, conf, mysql){
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	const con = mysql.createConnection({
	    host     : conf.get('db').connection,
	    user     : conf.get('db').user,
	    password : conf.get('db').pass, 
		database : conf.get('db').database
	});
	con.query('SELECT * FROM `clothing`', function(error, result, fields){
		if(error == null){
			var presets = [];
			result.forEach(function(v, i){
				presets.push({
					'name': v.name,
					'torso': [v.torso_draw, v.torso_tex],
					'legs': [v.legs_draw, v.legs_tex],
					'foot': [v.foot_draw, v.foot_tex],
					'torso_acc': [v.torso_acc_draw, v.torso_acc_tex],
					'hands': [v.hands_draw, v.hands_tex],
					'helmet': [v.helmet_draw, v.helmet_tex],
					'mask': [v.mask_draw, v.mask_tex]
				});
			});
			response.json(presets);
		} else{
			console.log(error);
		}
		response.json(presets);
	});
	con.end();
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