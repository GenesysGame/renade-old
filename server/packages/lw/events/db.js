var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '188.120.235.38',
    port: '3307',
    user: 'rage',
    password: 'ggame-rage',
    database: 'lw'
});
    
connection.connect();

connection.query('SELECT * FROM lw.`character`;', function (error, results, fields) {
    if (error) throw error;
    for (var i = 0, len = results.length; i < len; i++) {
        let res = results[i];
        console.log(i + " -> id: " + res.id + ", firstname: " + res.firstname + ", lastname: " + res.lastname);
    }
});

connection.end();