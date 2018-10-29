var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('{"response":"Mainstay-API"}');
});

app.listen(9000);
