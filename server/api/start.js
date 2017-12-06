var express = require('express'),
    http = require('http'),
    mysql = require('mysql'),
    app = express(),
    anim = require('./routes/anim'),
    conf = require('./config'),
    clothes = require('./routes/clothes'),
    animlist = require('./routes/anim/animations.js'),
    total = 0,
    pagesize = 200;

animlist.animations.forEach(function(v, i) {
    total += 1;
});
console.log('Loaded',total,'animations');
var totalPages  = Math.floor(total / pagesize);

app.get('/admin/animations/get', function(request, response){
    anim.get(request, response, totalPages, pagesize);
});

app.get('/admin/clothes/get', function(request, response){
    clothes.get(request, response, conf, mysql);
});

app.delete('/admin/clothes/delete', function(request, response){
    clothes.delete(request, response);
}); 

app.put('/admin/clothes/put', function(request, response){
    clothes.put(request, response);
});

app.options('*', function(request, response){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "DELETE, PUT, UPDATE, HEAD, OPTIONS, GET, POST");
    response.end();
});
app.listen(conf.get('port'));
console.log('Server running on '+conf.get("port")+' port');