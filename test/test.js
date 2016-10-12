/**
 * Created by Lawik Ayoub on 12-Oct-16.
 */
var supertest = require('supertest');
var express = require('express');

var app = express();

app.get('/api/movies', function(req, res) {
    res.status(200).json();
});

var server = supertest.agent("http://localhost:3000");


describe("Users unittest",function(){
    it("should return all movies", function(done){
        server.get("/api/movies")
            .set('Accept', 'application/json')
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res){
                done(err);
            });
    });
});


describe('GET api/movies', function() {
    it('respond with json', function(done) {
        supertest(app)
            .get('/api/movies')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});