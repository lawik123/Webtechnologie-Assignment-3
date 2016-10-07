/**
 * Created by Lawik Ayoub on 05-Oct-16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    _id: {type: Number, required: true},
    title: { type: String, required: true },
    release: {type: String, required:true},
    length: { type: Number, required: true },
    director: {type: String, required: true},
    description: {type:String, required: true},
    rating: {type: [], required: false}
});

module.exports = mongoose.model('Movie', movieSchema,'movies');

