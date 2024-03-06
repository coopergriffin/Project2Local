const router = require('express').Router();

const userRoutes = require('./user-routes');
const movieRoutes = require('./movie-routes'); // Import the movie routes

// Use the user routes
router.use('/users', userRoutes);

// Use the movie routes
router.use('/movies', movieRoutes); // Add this line to use movie routes

module.exports = router;