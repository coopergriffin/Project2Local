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
  if (!selectedMovieId || !firstMovieYear || !secondMovieYear) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (typeof req.session.userId === 'undefined' || typeof req.session.score === 'undefined') {
    return res.status(403).json({ message: 'Unauthorized or session expired' });
  }

  try {
    const selectedMovie = await Movie.findByPk(selectedMovieId);
    if (!selectedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (selectedMovie.releaseYear === Math.min(firstMovieYear, secondMovieYear)) {
      req.session.score = (req.session.score || 0) + 1;
      
      const user = await User.findByPk(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (req.session.score > user.highScore) {
        user.highScore = req.session.score;
        await user.save();
      }
      res.json({ correct: true, score: req.session.score, highScore: user.highScore });
    } else {
      const lastScore = req.session.score;
      req.session.score = 0;
      res.json({ correct: false, score: lastScore, highScore: user.highScore });
    }
  } catch (err) {
    console.error('Error submitting movie choice:', err);
    res.status(500).json({ message: 'An error occurred while processing your request', error: err.message });
  }
});

// Route to get the high score of the logged-in user
router.get('/users/highscore', async (req, res) => {
  if (!req.session.userId) {
    return res.status(403).json({ message: 'Not logged in' });
  }

  try {
    const user = await User.findByPk(req.session.userId, {
      attributes: ['highScore'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ highScore: user.highScore });
  } catch (err) {
    console.error('Error fetching user high score:', err);
    res.status(500).json({ message: 'An error occurred while fetching the high score', error: err.message });
  }
});

module.exports = router;