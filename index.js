var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile('main.html');
});

app.listen(8080, () => {
    console.log('Listening on port 8080...');
})