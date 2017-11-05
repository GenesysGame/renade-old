var anim = require('./animations.js');

module.exports.get = function(request, response, totalPages, pagesize){
	response.header('Content-Type', 'application/json');
	response.header("Access-Control-Allow-Origin", "*");
	var page = parseInt(request.query.page),
		animations = anim.animations,
		list = {
		page: page,
		total: totalPages,
		data: []
	};
	if(page == 0){
		var min = page * pagesize;
		var max = min + pagesize;
	} else{
		var min = page * pagesize + 1;
		var max = min + pagesize - 1;
	}
	console.log(page);
	console.log(min, max);
	animations.forEach(function (v, i) {
		if(i <= max && i >= min){
			var props = [];
			if (v.length > 0) {
				v.forEach(function(s, i, v) {
					if(i != 0){
						props.push(s);
					}
				});
			}
			var pack = {
				name: v[0], 
				props: props
			};
			list.data.push(pack);
		}
	});
	response.json(list);
	response.end();
};