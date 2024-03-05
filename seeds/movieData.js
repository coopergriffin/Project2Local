const { Movie } = require('../models');

const movieData = [
  {
    title: 'Inception',
    releaseYear: 2010,
    imageURL: 'http://example.com/inception.jpg',
  },
  {
    title: 'The Matrix',
    releaseYear: 1999,
    imageURL: 'http://example.com/matrix.jpg',
  },
  // Add more movies as needed
];

const seedMovies = () => Movie.bulkCreate(movieData);

module.exports = seedMovies;