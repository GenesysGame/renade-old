#!/usr/bin/env node
'use strict';

var express = require('express');
var app = express();
var anim = require('./animations.js');
var animations = anim.animations;
var total = 0;
animations.forEach(function(v, i) {
	total += 1;
});
var pagesize = 200;
var totalPages  = Math.floor(total / pagesize);
console.log('Loaded ' + total + ' animations');
app.get("/admin/animations/get", function(request, response){
    response.header('Content-Type', 'application/json');
    response.header("Access-Control-Allow-Origin", "*");
    var page = parseInt(request.query.page);
	var animations = anim.animations;
    var list = {
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
});
app.listen(80, '188.120.235.38');
console.log('Server running on 80 port');