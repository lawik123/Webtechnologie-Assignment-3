/**
 * Created by Lawik Ayoub on 26-Sep-16.
 */

var express = require('express');
var app = express();
var	mongoose	=	require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Blog = require('./modules/Blog.js');

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

var post = new Blog({ title: 'blog post', author: 'blog author', body: 'content'});
post.save(function (err, result){
    if (err){
        return console.error(err);
    }
});

// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/post', function (req, res) {
    res.send('Got a POST request!!!!!');
    console.log(req.body.name);
});

app.get('/blog', function (req, res) {
    Blog.find({author: 'blog author'}, {comments: 0},
        function (err, results) {
            if (err) return console.error(err);
            res.send(results)
        });

})