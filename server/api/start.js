'use strict';
var express = require('express');
var app = express();
var anim = require('./animations.js');
app.get("/admin/animations/get", function(request, response){
    response.header('Content-Type', 'application/json');
    response.header("Access-Control-Allow-Origin", "*");
	var animations = anim.animations;
    var max = parseInt(request.query.max);
    var min = parseInt(request.query.min);
    var list = [];
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
		    var pack = { name: v[0] };
		    pack.props = props;
		    list.push(pack);
    	}
	});
    response.json(list);
    response.end();
});
app.listen(80);
console.log('Server running on 80');