/**
 * Created by Lars Meulenbroek on 10/7/2016.
 */
var Movie = require('./Movies');

module.exports = function (){
// create a new Movie
    var newMovie1 = Movie({
        _id: 1,
        title: 'The Shawshank Redemption',
        release: '1994',
        length: 142,
        director: 'Frank Darabont',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
    });

// save the Movie
    newMovie1.save(function (err) {
        if (err) throw err;

        console.log('Movie 1 created!');
    });

// create a new Movie
    var newMovie2 = Movie({
        _id: 2,
        title: 'The Godfather',
        release: '1972',
        length: 175,
        director: 'Francis Ford Coppola',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
    });

// save the Movie
    newMovie2.save(function (err) {
        if (err) throw err;

        console.log('Movie 1 created!');
    });

// create a new Movie
    var newMovie3 = Movie({
        _id: 3,
        title: 'The Godfather: Part II',
        release: '1974',
        length: 202,
        director: 'Francis Ford Coppola',
        description: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.'
    });

// save the Movie
    newMovie3.save(function (err) {
        if (err) throw err;

        console.log('Movie 1 created!');
    });

// create a new Movie
    var newMovie4 = Movie({
        _id: 4,
        title: 'The Dark Knight',
        release: '2008',
        length: 152,
        director: 'Christopher Nolan',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.'
    });

// save the Movie
    newMovie4.save(function (err) {
        if (err) throw err;

        console.log('Movie 1 created!');
    });


// create a new Movie
    var newMovie5 = Movie({
        _id: 5,
        title: '12 Angry Men',
        release: '1957',
        length: 96,
        director: 'Sidney Lumet',
        description: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.'
    });

// save the Movie
    newMovie5.save(function (err) {
        if (err) throw err;

        console.log('Movie 1 created!');
    });
};


