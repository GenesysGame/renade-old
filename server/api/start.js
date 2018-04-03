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
    bodyParser = require('body-parser');
    urlencodedParser = bodyParser.urlencoded({ extended: false });

const con = mysql.createConnection({
    host     : conf.get('db').connection,
    user     : conf.get('db').user,
    password : conf.get('db').pass, 
    database : conf.get('db').database
});

animlist.animations.forEach(function(v, i) {
    total += 1;
});
console.log('Loaded',total,'animations');
var totalPages  = Math.floor(total / pagesize);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, UPDATE, HEAD, OPTIONS, GET, POST");
    next();
});

app.get('/admin/animations/get', function(request, response){
    anim.get(request, response, totalPages, pagesize);
});

app.get('/admin/clothes/get', function(request, response){
    clothes.get(request, response, conf, con);
});

app.delete('/admin/clothes/delete/:name', function(request, response){
    clothes.delete(request, response, con);
}); 

app.put('/admin/clothes/put', urlencodedParser, function(request, response){
    clothes.put(request, response, con);
});

app.listen(conf.get('port'));
console.log('Server running on '+conf.get("port")+' port');