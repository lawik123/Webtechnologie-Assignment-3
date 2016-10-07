/**
 * Created by Lawik Ayoub on 26-Sep-16.
 */

var express = require('express');
var app = express();
var	mongoose	=	require('mongoose');
mongoose.connect('mongodb://localhost/notFlix');;
var jwt = require('jsonwebtoken');
var apiRoutes = express.Router();
var Movie = require('./modules/Movies');
var User = require ('./modules/User');

app.set('private-key', 'super-secret-key');

// parse application/json
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.use(bodyParser.urlencoded({
    extended: true

}));


app.post('/api/authenticate', function (req,res) {
    User.findOne({userName: req.body.userName},function (err, user) {
        if (err) return console.error(err);

        if(!user){
            res.send('Invalid username')
        }
        else if(user){
            if(user.password != req.body.password){
                res.send('Invalid password')
            }
            else{
                var token = jwt.sign({userName:req.body.userName}, app.get('private-key'), {
                    expiresIn: 60*10 // expires in 10 minutes
                });
                res.send(token)

            }
        }

    });
})

apiRoutes.use(function (req,res,next) {
    var token = req.headers['authorization'];

    if(token){
        jwt.verify(token, app.get('private-key'), function (err, decoded) {
            if(err){
                res.send('Failed to Authenticate token')
            }
            else{
                req.decoded = decoded;
                next();
            }

        });
    } else{
        return res.status(403).send({
            success:false,
            message: 'No token provided'
        })

    }

})

apiRoutes.get('/', function (req, res) {
    res.send('Hello api!');

});


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


//localhost:3000/api/movies dit vindt alle films
app.get('/api/movies', function (req, res) {
        var object = {};
        for(i=0; i< Object.keys(req.query).length; i++){
            var name = Object.keys(req.query)[i];
            object[name]= req.query[name];
        }

        Movie.find(object,
            function (err, results) {
                if (err) return console.error(err);
                res.send(results)
            });
})



//localhost:3000/api/movies/1 dit vindt de film met id 1
app.get('/api/movies/:id', function (req, res) {
    Movie.find({_id:req.params.id},
        function (err, results) {
            if (err) return console.error(err);
            res.send(results)
        });

})


app.use('/api', apiRoutes);


//niet nodig voor opdracht, gedaan als test
app.post('/addmovie', function (req, res) {
    // res.send('Got a POST request!!!!!');
    // console.log(req.body.name);
    var post = new Movie({_id: req.body._id,title: req.body.title, release: req.body.release, length: req.body.length,
        director: req.body.director, description: req.body.description});
    post.save(function (err,result) {

    })
    res.send('added')
});




