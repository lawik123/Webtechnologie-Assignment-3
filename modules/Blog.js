
var	mongoose =require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);