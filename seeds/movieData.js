const { Movie } = require('../models');

const movieData = [
    {

        id: 1,
    
        title: "The Shawshank Redemption",
    
        releaseYear: 1994,
    
        imageURL: "https://example.com/shawshank.jpg",
    
    },
    
    {
    
        id: 2,
    
        title: "The Godfather",
    
        releaseYear: 1972,
    
        imageURL: "https://example.com/godfather.jpg",
    
    },
    
    {
    
        id: 3,
    
        title: "The Dark Knight",
    
        releaseYear: 2008,
    
        imageURL: "https://example.com/darkknight.jpg",
    
    },
    
    {
    
        id: 4,
    
        title: "The Godfather Part II",
    
        releaseYear: 1974,
    
        imageURL: "https://example.com/godfather2.jpg",
    
    },
    
    {
    
        id: 5,
    
        title: "12 Angry Men",
    
        releaseYear: 1957,
    
        imageURL: "https://example.com/12angrymen.jpg",
    
    },
    
    {
    
        id: 6,
    
        title: "Schindler's List",
    
        releaseYear: 1993,
    
        imageURL: "https://example.com/schindlerslist.jpg",
    
    },
    
    {
    
        id: 7,
    
        title: "The Lord of the Rings: The Return of the King",
    
        releaseYear: 2003,
    
        imageURL: "https://example.com/returnoftheking.jpg",
    
    },
    
    {
    
        id: 8,
    
        title: "Pulp Fiction",
    
        releaseYear: 1994,
    
        imageURL: "https://example.com/pulpfiction.jpg",
    
    },
    
    {
    
        id: 9,
    
        title: "The Good, the Bad and the Ugly",
    
        releaseYear: 1966,
    
        imageURL: "https://example.com/goodbadugly.jpg",
    
    },
    
    {
    
        id: 10,
    
        title: "The Lord of the Rings: The Fellowship of the Ring",
    
        releaseYear: 2001,
    
        imageURL: "https://example.com/fellowship.jpg",
    
    },
    
];
    
const seedMovies = () => Movie.bulkCreate(movieData);

module.exports = seedMovies;