var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    lastName: { type: String, required: true },
    tussenvoegsel: {type: String, required:false},
    firstName: { type: String, required: true },
    userName: {type: String, required: true},
    password: {type:String, required: true}
});

module.exports = mongoose.model('User', userSchema,'users');