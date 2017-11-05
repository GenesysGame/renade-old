var express = require('express'),
    http = require('http'),
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
var totalPages  = Math.floor(total / pagesize);

app.get('/admin/animations/get', function(request, response){
    anim.get(request, response, totalPages, pagesize);
});

app.get('/admin/clothes/get', function(request, response){
    clothes.get(request, response);
});

app.delete('/admin/clothes/delete', function(request, response){
    // Делается
}); 

app.put('/admin/clothes/put', function(request, response){
    // Делается
});

app.listen(conf.get('port'));
console.log('Server running on '+conf.get("port")+' port');