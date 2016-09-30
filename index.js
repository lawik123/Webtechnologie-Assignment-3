/**
 * Created by Lawik Ayoub on 26-Sep-16.
 */

var express = require('express');
var app = express();

// parse application/json
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/api', function (req, res) {
    res.send('Hello api!');
});

app.post('/post', function (req, res) {
    res.send('Got a POST request');
});