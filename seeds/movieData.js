const { Movie } = require('../models');

const movieData = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        releaseYear: 1994,
        imageURL: "/img/the_shawshank_redemption.jpg",
    },
    {
        id: 2,
        title: "The Godfather",
        releaseYear: 1972,
        imageURL: "/img/the_godfather.jpg",
    },
    {
        id: 3,
        title: "The Dark Knight",
        releaseYear: 2008,
        imageURL: "/img/the_dark_knight.jpg",
    },
    {
        id: 4,
        title: "The Godfather Part II",
        releaseYear: 1974,
        imageURL: "/img/the_godfather_part_ii.jpg",
    },
    {
        id: 5,
        title: "12 Angry Men",
        releaseYear: 1957,
        imageURL: "/img/12_angry_men.jpg",
    },
    {
        id: 6,
        title: "Schindler's List",
        releaseYear: 1993,
        imageURL: "/img/schindlers_list.jpg",
    },
    {
        id: 7,
        title: "The Lord of the Rings: The Return of the King",
        releaseYear: 2003,
        imageURL: "/img/the_lord_of_the_rings_the_return_of_the_king.jpg",
    },
    {
        id: 8,
        title: "Pulp Fiction",
        releaseYear: 1994,
        imageURL: "/img/pulp_fiction.jpg",
    },
    {
        id: 9,
        title: "The Good, the Bad and the Ugly",
        releaseYear: 1966,
        imageURL: "/img/the_good_the_bad_and_the_ugly.jpg",
    },
    {
        id: 10,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        releaseYear: 2001,
        imageURL: "/img/the_lord_of_the_rings_the_fellowship_of_the_ring.jpg",
    },
];

const seedMovies = () => Movie.bulkCreate(movieData);

module.exports = seedMovies;