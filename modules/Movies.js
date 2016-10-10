/**
 * Created by Lawik Ayoub on 05-Oct-16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/notFlix");

autoIncrement.initialize(connection);

var movieSchema = new Schema({
    _id: {type: Number, required: true},
    title: { type: String, required: true },
    release: {type: String, required:true},
    length: { type: Number, required: true },
    director: {type: String, required: true},
    description: {type:String, required: true},
    ratings: {type: [], required: false}
});

movieSchema.plugin(autoIncrement.plugin,{
    model:'Movie',
    field: '_id',
    startAt: 1,
    incrementBy:1
});


module.exports = mongoose.model('Movie', movieSchema,'movies');


