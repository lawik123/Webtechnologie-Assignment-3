/**
 * Created by Lawik Ayoub on 26-Sep-16.
 */

var express = require('express');
var app = express();
var	mongoose	=	require('mongoose');
mongoose.connect('mongodb://localhost/test');
var schema = mongoose.Schema;
var blogSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now }
});

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

app.use(bodyParser.urlencoded({
    extended: true

}));

// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/post', function (req, res) {
    res.send('Got a POST request!!!!!');
    console.log(req.body.name);
});