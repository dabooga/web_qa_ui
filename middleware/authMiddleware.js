
function authenticateToken(req, res, next) {
    if (req.session.token) {
      next();
    } else {
      res.redirect('/login');
    }
  }
  
  module.exports = authenticateToken;