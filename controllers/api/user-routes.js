const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET high score for logged-in user
/*router.get('/highscore', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(403).json({ message: 'User not logged in' });
    return;
  }

  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: ['highScore'],
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
*/

// Add this route to controllers/api/user-routes.js
router.get('/highscore', withAuth, async (req, res) => {
  try {
    // Assuming the user's ID is stored in the session upon login
    const userData = await User.findByPk(req.session.userId, {
      attributes: ['highScore'], // Fetch only the highScore
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ highScore: userData.highScore });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// In user-routes.js

// Route to handle score submission


router.post('/submit', withAuth, async (req, res) => {
  // Your existing logic remains here
  try {
    const userId = req.session.userId;
    const { currentScore } = req.body;

    // Fetch the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's highscore if the currentScore is higher than the existing highscore
    if (currentScore > user.highScore) {
      user.highScore = currentScore;
      await user.save();
    }

    // Respond with the updated highscore
    res.json({ highScore: user.highScore });
  } catch (err) {
    console.error('Error updating high score:', err);
    res.status(500).json({ message: 'An error occurred while updating the high score', error: err.message });
  }
});
// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
