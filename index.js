/**
 * Created by Lawik Ayoub on 26-Sep-16.
 */
var express = require('express');
var app = express();
var	mongoose = require('mongoose'),Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.connect('mongodb://localhost/notFlix');
autoIncrement.initialize(connection)
var jwt = require('jsonwebtoken');
var apiRoutes = express.Router();
var Movie = require('./modules/Movies');
var User = require ('./modules/User');
var initdb = require('./modules/initdb');



//clear the movies collection to avoid duplicates
Movie.remove({},function (err) {
    movie = new Movie();
    movie.save(function (err) {
        movie.nextCount(function(err, count) {
            movie.resetCount(function(err, nextCount) {
            });
        });
    });
    console.log('collection removed')

})

initdb();//initialize the movies collection


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
});

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

});

apiRoutes.get('/', function (req, res) {
    res.send(req.decoded.userName);

});

//TODO: maybe change to aggregate so the ratings array isn't display but only the rating.
apiRoutes.get('/personalratings',function (req,res) {
    Movie.find({'ratings.userName':req.decoded.userName},{'ratings':{$elemMatch:{'userName':req.decoded.userName}},'__v':0,'ratings.userName':0}).sort({'_id':1}).exec(function (err, results) {
        if (err) return console.error(err);
        res.send(results)

    })

});

apiRoutes.get('/userlist',function (req,res) {
    var object = {};
    for(i=0; i< Object.keys(req.query).length; i++){
        var name = Object.keys(req.query)[i];
        object[name]= req.query[name];
    }

    User.find(object,{password:0,_id:0,__v:0},
        function (err, results) {
            if (err) return console.error(err);
            res.send(results)
        });

});

apiRoutes.post('/addrating', function (req,res) {
    movie = Movie.findById({_id:req.body._id},function (err,results) {
        if(results===null){
            res.send('invalid id');
        }else {
            var array = results.ratings;

            function alreadyRated() {
                for (i = 0; i < array.length; i++) {
                    if (array[i].userName === req.decoded.userName) {
                        // res.send("Already placed a rating for this movie");
                        return true;
                    }
                }
                return false;
            }

            if (alreadyRated()) {
                res.send("User already submitted rating for this movie");
            }
            else {
                movie.update({
                    $addToSet: {
                        "ratings": {
                            userName: req.decoded.userName,
                            rating: req.body.rating
                        }
                    }
                }, function (err, results) {
                    res.send("Added");
                });
            }
        }

    });
});

apiRoutes.post('/removerating', function (req,res) {
    movie = Movie.findById({_id:req.body._id},function (err,results) {
        if(results===null){
            res.send('invalid id');
        }else {
            var array = results.ratings;

            function alreadyRated() {
                for (i = 0; i < array.length; i++) {
                    if (array[i].userName === req.decoded.userName) {
                        // res.send("Already placed a rating for this movie");
                        return true;
                    }
                }
                return false;
            }

            if (!alreadyRated()) {
                res.send("User hasn't subimitted a rating for this movie.");
            }
            else {
                movie.update({
                    $pull: {
                        "ratings": {
                            userName: req.decoded.userName
                        }
                    }
                }, function (err, results) {
                    res.send("removed");
                });
            }
        }
    });
});

apiRoutes.post('/changerating', function (req,res) {
    movie = Movie.findById({_id:req.body._id},function (err,results) {
        if(results===null){
            res.send('invalid id');
        }else {
            var array = results.ratings;
            console.log(array);

            function alreadyRated() {
                for (i = 0; i < array.length; i++) {
                    if (array[i].userName === req.decoded.userName) {
                        // res.send("Already placed a rating for this movie");
                        return true;
                    }
                }
                return false;
            }

            if (!alreadyRated()) {
                res.send("User hasn't subimitted a rating for this movie.");
            }
            else {
                movie.update({ratings:{$elemMatch:{userName:req.decoded.userName}}},{
                    $set: {
                        "ratings.$": {
                            userName: req.decoded.userName,
                            rating: req.body.rating
                        }
                    }
                }, function (err, results) {
                    res.send("changed");
                });
            }
        }
    });
});

// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/register', function (req, res) {
    var post = new User({lastName:req.body.lastName, tussenvoegsel: req.body.tussenvoegsel, firstName: req.body.firstName,
                        userName: req.body.userName, password: req.body.password});
    post.save(function (err,result) {
        
    });
    res.send('added')
});


//localhost:3000/api/movies dit vindt alle films
app.get('/api/movies', function (req, res) {
        var object = {};
        for(i=0; i< Object.keys(req.query).length; i++){
            var name = Object.keys(req.query)[i];
            object[name]= req.query[name];
        }

        Movie.find(object,{ratings:0,__v:0}).sort({'_id':1}).exec
        (function (err, results) {
                if (err) return console.error(err);
                res.send(results)
            });
});

app.get('/api/movieratings', function (req, res) {
    Movie.aggregate([{$project:{title:"$title",rating_average:{$avg:"$ratings.rating"},rating_amount:{$size:"$ratings"}}},{$match:{rating_amount:{$gt:0}}},]).sort({'_id':1}).exec( function (err,results) {
        if(err) return console.error(err);
        res.send(results)

    });
});



//localhost:3000/api/movies/1 dit vindt de film met id 1
app.get('/api/movies/:id', function (req, res) {
    Movie.find({_id:req.params.id},
        function (err, results) {
            if (err) return console.error(err);
            res.send(results)
        });

});


app.use('/api', apiRoutes);


//niet nodig voor opdracht, gedaan als test
app.post('/addmovie', function (req, res) {
    var post = new Movie({_id: req.body._id,title: req.body.title, release: req.body.release, length: req.body.length,
        director: req.body.director, description: req.body.description});
    post.save(function (err,result) {

    });
    res.send('added')
});




