// controllers/api/movie-routes.js
const router = require('express').Router();
const { Movie, User } = require('../../models');
const sequelize = require('../../config/connection');

// Route to get two random movies
router.get('/random', async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: sequelize.random(),
      limit: 2,
    });
    res.json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Submit user's choice and update score
router.post('/submit', async (req, res) => {
  const { selectedMovieId, firstMovieYear, secondMovieYear } = req.body;
  try {
    const selectedMovie = await Movie.findByPk(selectedMovieId);
    // Check if the selected movie's release year is the earliest
    if (selectedMovie.releaseYear === Math.min(firstMovieYear, secondMovieYear)) {
      // Correct choice, update score
      req.session.score = (req.session.score || 0) + 1;
      
      // Fetch the user to update high score if necessary
      const user = await User.findByPk(req.session.userId);
      if (req.session.score > user.highScore) {
        user.highScore = req.session.score;
        await user.save();
        res.json({ correct: true, score: req.session.score, highScore: user.highScore });
      } else {
        res.json({ correct: true, score: req.session.score, highScore: user.highScore });
      }
    } else {
      // Incorrect choice, reset score but return the last score before resetting
      const lastScore = req.session.score;
      req.session.score = 0; // Reset score for a new game
      res.json({ correct: false, score: lastScore, highScore: user.highScore });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;