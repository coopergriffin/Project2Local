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
    const { selectedMovieId } = req.body;
    try {
      const selectedMovie = await Movie.findByPk(selectedMovieId);
      // Assuming you send both movies' IDs and use the release year to check
      if (selectedMovie.releaseYear === Math.min(req.body.firstMovieYear, req.body.secondMovieYear)) {
        req.session.score = (req.session.score || 0) + 1; // Update score
        // Check if the current score is higher than the user's high score
        const user = await User.findByPk(req.session.userId);
        if (req.session.score > user.highScore) {
          user.highScore = req.session.score;
          await user.save();
          res.json({ correct: true, score: req.session.score, newHighScore: true });
        } else {
          res.json({ correct: true, score: req.session.score, newHighScore: false });
        }
      } else {
        res.json({ correct: false, score: req.session.score });
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;