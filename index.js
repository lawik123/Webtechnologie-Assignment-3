/**
 * Created by Lawik Ayoub on 26-Sep-16.
 */

var express = require('express');
var app = express();
var	mongoose	=	require('mongoose');
mongoose.connect('mongodb://localhost/notFlix');;
var Movie = require('./modules/Movies');
var User = require ('./modules/User');

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

app.post('/register', function (req, res) {
    // res.send('Got a POST request!!!!!');
    // console.log(req.body.name);
    var post = new User({lastName:req.body.lastName, tussenvoegsel: req.body.tussenvoegsel, firstName: req.body.firstName,
                        userName: req.body.username, password: req.body.password});
    post.save(function (err,result) {
        
    })
    res.send('added')
});

app.get('/api/movies', function (req, res) {
    Movie.find({},
        function (err, results) {
            if (err) return console.error(err);
            res.send(results)
        });

})

//niet nodig voor opdracht, gedaan als test
app.post('/addmovie', function (req, res) {
    // res.send('Got a POST request!!!!!');
    // console.log(req.body.name);
    var post = new Movie({_id: 4,title: req.body.title, release: req.body.release, length: req.body.length,
        director: req.body.director, description: req.body.description});
    post.save(function (err,result) {

    })
    res.send('added')
});


