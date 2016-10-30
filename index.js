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
app.use(express.static('./public'));


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

});

//remove the previous test user
User.remove({userName:'test'},function (err) {
    console.log('test user removed')
})

initdb();//initialize the movies collection and the test user


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

//request to authenticate
app.post('/api/authenticate', function (req,res) {
    User.findOne({userName: req.body.userName},function (err, user) {
        if (err) return console.error(err);

        if(!user){
            return res.status(401).send({
                success:false,
                message: 'username does not exist'
            });
        }
        else if(user){
            if(user.password != req.body.password){
                return res.status(401).send({
                    success:false,
                    message: 'invalid password'
                });
            }
            else{
                var token = jwt.sign({userName:req.body.userName}, app.get('private-key'), {
                    expiresIn: 60*30 // expires in 30 minutes
                });
                return res.status(200).send({
                    success:true,
                    token: token
                });

            }
        }

    });
});

//method that checks if the user has provided a valid token
apiRoutes.use(function (req,res,next) {
    var token = req.headers['authorization'];

    if(token){
        jwt.verify(token, app.get('private-key'), function (err, decoded) {
            if(err){
                return res.status(401).send({
                    success:false,
                    message: 'Invalid token'
                });
            }
            else{
                req.decoded = decoded;
                next();
            }

        });
    } else{
        return res.status(401).send({
            success:false,
            message: 'No token provided'
        });

    }

});

//request to get a list of movies
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

//request to get a movie based on _id
app.get('/api/movies/:id', function (req, res) {
    Movie.find({_id:req.params.id},{ratings:0,__v:0},
        function (err, results) {
            if (err) return console.error(err);
            if(results.length===0){
                res.status(404).send({
                    success: false,
                    message: 'invalid id'
                });
            }
            else{
                res.status(200).send(results);
            }
        });

});

//request to get the average rating per movie(non-rated movies are not shown)
app.get('/api/movieratings', function (req, res) {
    Movie.aggregate([{$project:{title:"$title",description:"$description",length:"$length",director:"$director",release:"$release",rating_average:{$avg:"$ratings.rating"},rating_amount:{$size:"$ratings"}}},{$match:{rating_amount:{$gt:0}}},]).sort({'_id':1}).exec( function (err,results) {
        res.status(200).send(results)

    });
});

//request to register an account
app.post('/api/register', function (req, res) {
    User.findOne({userName:req.body.userName},function (err,results) {
        if(results){
            return res.status(409).send({
                success: false,
                message: 'username already exists'
            })
        }else if(!results){
            var post = new User({lastName:req.body.lastName, tussenvoegsel: req.body.tussenvoegsel, firstName: req.body.firstName,
                userName: req.body.userName, password: req.body.password});
            post.save(function (err,result) {
                if(result){
                    return res.status(201).send({
                        success: true,
                        message: 'user created'
                    })

                }
                else{
                    return res.status(400).send({
                        success: false,
                        message: 'Missing fields'
                    })
                }
            })
        }
    });

});

//request to retrieve a list with registered users
apiRoutes.get('/userlist',function (req,res) {
    var object = {};
    for(i=0; i< Object.keys(req.query).length; i++){
        var name = Object.keys(req.query)[i];
        object[name]= req.query[name];
    }

    User.find(object,{password:0,_id:0,__v:0},
        function (err, results) {
            res.status(200).send(results);

        });
});

//request to retrieve one user based on username
apiRoutes.get('/userlist/:username',function (req,res) {
    User.find({userName:req.params.username},{password:0,_id:0,__v:0},
        function (err, results) {
            if(results.length===0){
                res.status(404).send({
                    success: false,
                    message: 'No user found'
                });
            }
            else{
                res.status(200).send(results);
            }
        });

});

//request to add a rating to a movie
apiRoutes.post('/addrating', function (req,res) {
    movie = Movie.findById({_id:parseFloat(req.body._id)},function (err,results) {
        console.log(req.body._id);
        console.log(req.body.rating);
        if(results===null||results.length===0){
                res.status(404).send({
                    success: false,
                    message: 'invalid id'
                });
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
                res.status(409).send({
                    success: false,
                    message: 'user already submitted a rating for this movie'
                });
            }
            else {
                var rating = parseFloat(req.body.rating);
                if(rating===0.5||rating===1||rating===1.5||rating===2||rating===2.5||rating===3
                    ||rating===3.5||rating===4||rating===4.5||rating==5) {
                    movie.update({
                        $addToSet: {
                            "ratings": {
                                userName: req.decoded.userName,
                                rating: parseFloat(req.body.rating)
                            }
                        }
                    }, function (err, results) {
                        res.status(201).send({
                            success: true,
                            message: 'rating submitted'
                        });
                    });
                } else{
                    res.status(400).send({
                        success: false,
                        message: 'invalid rating'
                    });
                }
            }
        }

    });
});

//request to change a rating of a movie
apiRoutes.put('/changerating', function (req,res) {
    movie = Movie.findById({_id:parseFloat(req.body._id)},function (err,results) {
        console.log("test"+req.body.id);
        if(results===null){
            res.status(404).send({
                success: false,
                message: 'invalid id'
            });
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
                res.status(404).send({
                    success: false,
                    message: 'No rating to update, user has not rated this movie'
                });
            }
            else {
                var rating = parseFloat(req.body.rating);
                if(rating===0.5||rating===1||rating===1.5||rating===2||rating===2.5||rating===3
                    ||rating===3.5||rating===4||rating===4.5||rating==5) {
                    movie.update({ratings: {$elemMatch: {userName: req.decoded.userName}}}, {
                        $set: {
                            "ratings.$": {
                                userName: req.decoded.userName,
                                rating: parseFloat(req.body.rating)
                            }
                        }
                    }, function (err, results) {
                        res.status(200).send({
                            success: true,
                            message: 'Rating updated'
                        });
                    });
                }else{
                    res.status(400).send({
                        success: false,
                        message: 'invalid rating'
                    });
                }
            }
        }
    });
});

//request to remoeve a rating from a movie
apiRoutes.delete('/removerating', function (req,res) {
    movie = Movie.findById({_id:parseFloat(req.body._id)},function (err,results) {
        if(results===null){
            res.status(404).send({
                success: false,
                message: 'invalid id'
            });
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
                res.status(404).send({
                    success: false,
                    message: 'No rating to remove, user has not rated this movie'
                });
            }
            else {
                movie.update({
                    $pull: {
                        "ratings": {
                            userName: req.decoded.userName
                        }
                    }
                }, function (err, results) {
                    res.status(200).send({
                        success: true,
                        message: 'Rating removed'
                    });
                });
            }
        }
    });
});

//request to retrieve a list of movies the current user rated
apiRoutes.get('/personalratings',function (req,res) {
    Movie.find({'ratings.userName':req.decoded.userName},{'ratings':{$elemMatch:{'userName':req.decoded.userName}},'__v':0,'ratings.userName':0}).sort({'_id':1}).exec(function (err, results) {
        if (err) return console.error(err);
            res.status(200).send(results);

    })

});

//request to retrieve a list of all the movies movies and displays the rating for each movie
apiRoutes.get('/personalratings2',function (req,res) {
    Movie.find({},{'ratings':{$elemMatch:{'userName':req.decoded.userName}},'__v':0,'ratings.userName':0}).sort({'_id':1}).exec(function (err, results) {
        if (err) return console.error(err);
        res.status(200).send(results);

    })

});

app.use('/api', apiRoutes);





