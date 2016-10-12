/**
 * Created by Lawik Ayoub on 12-Oct-16.
 */
var supertest = require('supertest');
var express = require('express');
var app = express();
var server = supertest.agent("http://localhost:3000");

describe("Movies test",function(){
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
    it('should return json with the The Shawshank Redemption movie', function (done) {
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
    it('should return json with the The Shawshank Redemption movie', function (done) {
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
});
