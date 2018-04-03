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
	console.log('Deleted preset: '+request.params['name']);
	response.end('debug delete');
};

module.exports.put = function(request, response, con){
	con.query('INSERT INTO `clothing` (`name`, `torso_draw`, `torso_tex`, `torso_acc_draw`, `torso_acc_tex`, `legs_draw`, `legs_tex`, `foot_draw`, `foot_tex`, `hands_draw`, `hands_tex`, `helmet_draw`, `helmet_tex`, `mask_draw`, `mask_tex`) VALUES ("'+request.body.name+'", '+request.body['preset[]'][0]+', '+request.body['preset[]'][1]+', '+request.body['preset[]'][2]+', '+request.body['preset[]'][3]+', '+request.body['preset[]'][4]+', '+request.body['preset[]'][5]+', '+request.body['preset[]'][6]+', '+request.body['preset[]'][7]+', '+request.body['preset[]'][8]+', '+request.body['preset[]'][9]+', '+request.body['preset[]'][10]+', '+request.body['preset[]'][11]+', '+request.body['preset[]'][12]+', '+request.body['preset[]'][13]+')', function(error, result, fields){
		if(error != null){
			console.log(error);
		};
	});
	console.log('Created preset: '+request.body.name);
	response.end('debug put');
};