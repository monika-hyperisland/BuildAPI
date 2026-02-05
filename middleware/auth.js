const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'Authentication required. Please log in to continue.' });
  }

  const token = header.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'Authentication required. Please log in to continue.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Your session has expiredPlease log in again or check your token.' });
  }
};
