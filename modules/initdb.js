/**
 * Created by Lars Meulenbroek on 10/7/2016.
 */

var Movie = require('./Movies');
var User = require('./User');

module.exports = function (){
// create a new Movie
    var newMovie1 = Movie({
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
        title: 'The Godfather',
        release: '1972',
        length: 175,
        director: 'Francis Ford Coppola',
        description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'
    });

// save the Movie
    newMovie2.save(function (err) {
        if (err) throw err;

        console.log('Movie 2 created!');
    });

    // create a new Movie
    var newMovie3 = Movie({
        title: 'The Godfather: Part II',
        release: '1974',
        length: 202,
        director: 'Francis Ford Coppola',
        description: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.'
    });

// save the Movie
    newMovie3.save(function (err) {
        if (err) throw err;

        console.log('Movie 3 created!');
    });


// create a new Movie
    var newMovie4 = Movie({
        title: 'The Dark Knight',
        release: '2008',
        length: 152,
        director: 'Christopher Nolan',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.'
    });

// save the Movie
    newMovie4.save(function (err) {
        if (err) throw err;

        console.log('Movie 4 created!');
    });


// create a new Movie
    var newMovie5 = Movie({
        title: '12 Angry Men',
        release: '1957',
        length: 96,
        director: 'Sidney Lumet',
        description: 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.'
    });

// save the Movie
    newMovie5.save(function (err) {
        if (err) throw err;

        console.log('Movie 5 created!');
    });

    // create a new Movie
    var newMovie6 = Movie({
        title: 'Pulp fiction',
        release: '1994',
        length: 154,
        director: 'Quentin Tarantino',
        description: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    });

// save the Movie
    newMovie6.save(function (err) {
        if (err) throw err;

        console.log('Movie 6 created!');
    });

    var newMovie7 = Movie({
        title: 'Fight Club',
        release: '1999',
        length: 139,
        director: 'David Fincher',
        description: 'An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more.'
    });

// save the Movie
    newMovie7.save(function (err) {
        if (err) throw err;

        console.log('Movie 7 created!');
    });

    var newMovie8 = Movie({
        title: 'Inception',
        release: '2010',
        length: 148,
        director: 'Christopher Nolan',
        description: 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.'
    });

// save the Movie
    newMovie8.save(function (err) {
        if (err) throw err;

        console.log('Movie 8 created!');
    });

    var newMovie9 = Movie({
        title: 'Goodfellas',
        release: '1990',
        length: 146,
        director: 'Martin Scorsese',
        description: 'Henry Hill and his friends work their way up through the mob hierarchy.'
    });

// save the Movie
    newMovie9.save(function (err) {
        if (err) throw err;

        console.log('Movie 9 created!');
    });

    var newUser = User({
        lastName: 'test',
        firstName: 'test',
        userName: 'test',
        password: 'test'
    })

    newUser.save(function (err) {
        if(err) throw err;
        console.log('test user created')

    })
};


