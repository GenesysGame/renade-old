// Animations routes for API

const express = require('express');
const server = require('../../server');

const animations = require('../../helpers/animations').animations;
var total = animations.length;
var pagesize = 200;
var totalPages  = Math.floor(total / pagesize);

module.exports = function () {
    server.app.get('/animations', (req, res) => { get(req, res); });
};

function get(request, response) {
    response.header('Content-Type', 'application/json');
    response.header("Access-Control-Allow-Origin", "*");
    var page = parseInt(request.query.page);
	if (!page) { page = 0; };
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
}
