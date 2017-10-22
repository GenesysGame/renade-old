'use strict';
const http = require('http');
var anim = require('./animations.js');
http.createServer( function(requset, response){
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
	var animations = anim.animations;
    var url = requset.url.split('=');
    var max = parseInt(url[2]);
    var min = parseInt(url[1].split('&')[0]);
    var list;
    console.log(min, max);
    animations.forEach(function (v, i) {
    	if(i <= max && i >= min){
    		var option = [];
		    var label = v[0];
		    v[0] = '';
	        if (v.length > 0) {
	        	var si;
	        	v.forEach(function(s, i, v) {
	        		if(s != ''){
	        			if(option.length == 0){
			            	option[0] = '<option value="'+label+','+s+'">'+s+'</option>';
			        	} else{
			            	option[option.length] = '<option value="'+label+','+s+'">'+s+'</option>';
			        	}
	        		}
	        	});
	        }
		    var group = '<optgroup id="'+i+'" label="'+label+'">'+option.join('')+'</optgroup>';
		    list += group;
    	}
	});
    response.end(list);
}).listen(80);
console.log('Server running on 80');