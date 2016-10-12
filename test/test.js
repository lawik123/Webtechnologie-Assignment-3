/**
 * Created by Lawik Ayoub on 12-Oct-16.
 */
var supertest = require('supertest');
var	mongoose = require('mongoose'),Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.connect('mongodb://localhost/notFlix');
autoIncrement.initialize(connection)
var server = supertest("http://localhost:3000");
var User = require ('../modules/User');




describe("movies test",function(){
    it("should return all movies", function(done){
        server.get("/api/movies")
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res){
                done(err);
            });
    });
    it('should return empty json', function (done) {
            server.get('/api/movies?_id=100')
            .set('Accept', 'application/json')
            .expect("content-type", /json/)
            .expect(200,{

            })
            .end(function (err,res) {
                done(err);
            });
    });
    it('should return the movie with _id:1', function (done) {
        server.get('/api/movies?_id=1')
            .set('Accept', 'application/json')
            .expect("content-type", /json/)
            .expect(200,[{
                    _id:1,
                    title: 'The Shawshank Redemption',
                    release: '1994',
                    length: 142,
                    director: 'Frank Darabont',
                    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
            }]
            )
            .end(function (err,res) {
                done(err);
            });
    });
    it('should return the movie with _id: 1', function (done) {
        server.get('/api/movies/1')
            .set('Accept', 'application/json')
            .expect("content-type", /json/)
            .expect(200,[{
                    _id:1,
                    title: 'The Shawshank Redemption',
                    release: '1994',
                    length: 142,
                    director: 'Frank Darabont',
                    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
                }]
            )
            .end(function (err,res) {
                done(err);
            });
    });
    it('should return error message saying the id does not exist', function (done) {
        server.get('/api/movies/9999')
            .set('Accept', 'application/json')
            .expect("content-type", /json/)
            .expect(404,{
                success: false,
                message: 'invalid id'
                }
            )
            .end(function (err,res) {
                done(err);
            });
    });
})
describe("registration test", function () {
    User.remove({userName:'test'},function (err) {
    });
    it("should create a new user", function(done){
        server.post("/api/register")
            .send({
                userName:'test',
                password:'test',
                firstName:'test',
                lastName:'test'
            })
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(201,{
                success:true,
                message: 'user created'
            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not create a new user because of the missing fields", function(done){
        server.post("/api/register")
            .send({

            })
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(400,{
                success: false,
                message: 'Missing fields'
            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not create a new user because the userName 'test' already exists", function(done){
        server.post("/api/register")
            .send({
                userName:'test',
                password:'test',
                firstName:'test',
                lastName:'test'
            })
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(409,{
                success: false,
                message: 'username already exists'
                }
            )
            .end(function(err, res){
                done(err);
            });
    });


})
describe("authorization test", function () {
    it("should authenticate", function(done){
        server.post("/api/authenticate")
            .send({
                userName:'test',
                password:'test',

            })
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res){
                done(err);
            });
    });
    it("should not authenticate because the user does not exist", function(done){
        server.post("/api/authenticate")
            .send({
                userName:'notanuser',
                password:'test',

            })
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(401,{
                success:false,
                message: 'username does not exist'
            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not authenticate because the password is incorrect", function(done){
        server.post("/api/authenticate")
            .send({
                userName:'test',
                password:'notmypassword',

            })
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(401,{
                success:false,
                message: 'invalid password'
            })
            .end(function(err, res){
                done(err);
            });
    });
})
describe("userlist and token test", function () {
    var auth = {};
    before(authUser(auth));
    it("should get the user list", function(done){
        server.get("/api/userlist")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res){
                done(err);
            });
    });
    it("should get the user with the username: 'test'", function(done){
        server.get("/api/userlist?userName=test")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200,[{
                lastName: 'test',
                firstName: 'test', userName: 'test'
            }])
            .end(function(err, res){
                done(err);
            });
    });
    it("should get the user with the username: 'test'", function(done){
        server.get("/api/userlist/test")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200,[{
                lastName: 'test',
                firstName: 'test', userName: 'test'
            }])
            .end(function(err, res){
                done(err);
            });
    });
    it("should not get the userlist because no token is provided", function(done){
        server.get("/api/userlist")
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(401,{
                success: false,
                message: 'No token provided'
            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not get the userlist because an invalid token is provided", function(done){
        server.get("/api/userlist")
            .set('Authorization', 'invalidtoken')
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(401,{
                success: false,
                message: 'Invalid token'
        })
            .end(function(err, res){
                done(err);
            });
    });
})
describe("CRUD rating test", function () {
    var auth = {};
    before(authUser(auth));
    //adding rating
    it("should not add a rating for the test user to the movie with the _id: '1' because the rating is higher than 5.0", function(done){
        server.post("/api/addrating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                rating: 5.1
            })
            .expect("Content-type", /json/)
            .expect(400,{
                success: false,
                message: 'invalid rating'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not add a rating for the test user to the movie with the _id: '1' because the rating is lower than 0.5", function(done){
        server.post("/api/addrating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                rating: 0.4
            })
            .expect("Content-type", /json/)
            .expect(400,{
                success: false,
                message: 'invalid rating'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not add a rating for the test user to the movie with the _id: '1' because no rating was provided", function(done){
        server.post("/api/addrating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1
            })
            .expect("Content-type", /json/)
            .expect(400,{
                success: false,
                message: 'invalid rating'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should add a rating for the test user to the movie with the _id: '1' and a rating of 0.5", function(done){
        server.post("/api/addrating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                rating: 0.5
            })
            .expect("Content-type", /json/)
            .expect(201,{
                success: true,
                message: 'rating submitted'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not add a rating for the test user to the movie with the _id: '1' because the user already rated this movie", function(done){
        server.post("/api/addrating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                rating: 5.0
            })
            .expect("Content-type", /json/)
            .expect(409,{
                success: false,
                message: 'user already submitted a rating for this movie'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not add a rating for the test user to the movie with the _id: '9999' because the _id doesn't exist", function(done){
        server.post("/api/addrating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 999,
                rating: 5.0
            })
            .expect("Content-type", /json/)
            .expect(404,{
                success: false,
                message: 'invalid id'

            })
            .end(function(err, res){
                done(err);
            });
    });

    //changing rating
    it("should change the rating of the test user for the movie with _id: '1' to 5.0", function(done){
        server.put("/api/changerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                rating: 5.0
            })
            .expect("Content-type", /json/)
            .expect(200,{
                success: true,
                message: 'Rating updated'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not change the rating of the test user for the movie with _id: '1' because the rating is higher than 5.0", function(done){
        server.put("/api/changerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                rating: 5.1
            })
            .expect("Content-type", /json/)
            .expect(400,{
                success: false,
                message: 'invalid rating'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not change the rating of the test user for the movie with _id: '1' because the rating is lower than 0.5", function(done){
        server.put("/api/changerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1,
                rating: 0.4
            })
            .expect("Content-type", /json/)
            .expect(400,{
                success: false,
                message: 'invalid rating'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not change the rating of the test user for the movie with _id: '1' because no rating was provided", function(done){
        server.put("/api/changerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1
            })
            .expect("Content-type", /json/)
            .expect(400,{
                success: false,
                message: 'invalid rating'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not change the rating of the test user for the movie with _id: '3' because the user never rated this movie before", function(done){
        server.put("/api/changerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 3
            })
            .expect("Content-type", /json/)
            .expect(404,{
                success: false,
                message: 'No rating to update, user has not rated this movie'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not change the rating of the test user for the movie with _id: '9999' because the _id doesn't exist", function(done){
        server.put("/api/changerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 9999,
                rating: 1
            })
            .expect("Content-type", /json/)
            .expect(404,{
                success: false, message: 'invalid id'

            })
            .end(function(err, res){
                done(err);
            });
    });

    //removing rating
    it("should remove the rating of the test user from the movie with _id: '1'", function(done){
        server.del("/api/removerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 1
            })
            .expect("Content-type", /json/)
            .expect(200,{
                success: true,
                message: 'Rating removed'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not remove the rating of the test user from the movie with _id: '2' because the user never rated this movie", function(done){
        server.del("/api/removerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 2
            })
            .expect("Content-type", /json/)
            .expect(404,{
                success: false,
                message: 'No rating to remove, user has not rated this movie'

            })
            .end(function(err, res){
                done(err);
            });
    });
    it("should not remove the rating of the test user from the movie with _id: '9999' because the _id doesn't exist", function(done){
        server.del("/api/removerating")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .send({
                _id: 9999
            })
            .expect("Content-type", /json/)
            .expect(404,{
                success: false,
                message: 'invalid id'

            })
            .end(function(err, res){
                done(err);
            });
    });

    //retrieve rating
    it("should get a list of movies the test user rated including the ratings", function(done){
        server.get("/api/personalratings")
            .set('Authorization', auth.token)
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res){
                done(err);
            });
    });

    it("should get a list of movies the test user rated including the ratings", function(done){
        server.get("/api/movieratings")
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res){
                done(err);
            });
    });

});



function authUser(auth) {
    return function(done) {
        server
            .post('/api/authenticate')
            .send({
                userName: 'test',
                password: 'test'
            })
            .expect(200)
            .end(onResponse);
        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}

