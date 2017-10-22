'use strict';
var express = require('express');
var app = express();
var anim = require('./animations.js');
app.get("/admin/animations/get", function(request, response){
    response.header('Content-Type', 'text/html');
    response.header("Access-Control-Allow-Origin", "*");
	var animations = anim.animations;
    var max = parseInt(request.query.max);
    var min = parseInt(request.query.min);
    var list = '';
    console.log(min, max);
    animations.forEach(function (v, i) {
    	if(i <= max && i >= min){
    		var option = [];
	        if (v.length > 0) {
	        	v.forEach(function(s, i, v) {
	        		if(i != 0){
	        			option.push('<option value="'+v[0]+','+s+'">'+s+'</option>');
	        		}
	        	});
	        }
		    var group = '<optgroup id="'+i+'" label="'+v[0]+'">'+option.join('')+'</optgroup>';
		    list += group;
    	}
	});
    response.end(list);
});
app.listen(80);
console.log('Server running on 80');