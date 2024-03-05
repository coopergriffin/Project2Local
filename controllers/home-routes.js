const router = require('express').Router();
// Import the custom middleware
const withAuth = require('../utils/auth');

// Redirect to the trivia game if logged in, otherwise show login page
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    // Render the trivia game page for logged-in users
    res.render('trivia', {
      loggedIn: req.session.loggedIn,
      // Filler content for the trivia game
      gameInfo: {
        description: "Welcome to the Movie Trivia Game! You'll be shown two different movies. Pick the one that you think is older.",
        movies: [
          {
            name: "Placeholder Movie 1",
            poster: "/path/to/placeholder1.jpg"
          },
          {
            name: "Placeholder Movie 2",
            poster: "/path/to/placeholder2.jpg"
          }
        ]
      }
    });
  } else {
    // Show login page if not logged in
    res.render('login');
  }
});

// Route for login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
