module.exports.get = function(request, response, conf, con){
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
	});
};

module.exports.delete = function(request, response, con){
	con.query("DELETE FROM `clothing` WHERE `name` = '"+request.params['name']+"'");
	response.end('debug delete');
};

module.exports.put = function(request, response){
	console.log(request.body);
	response.end('debug put');
};