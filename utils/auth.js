const withAuth = (req, res, next) => {
  console.log("withAuth middleware, loggedIn:", req.session.loggedIn);
  if (!req.session.loggedIn) {
    console.log("Redirecting to /login");
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
