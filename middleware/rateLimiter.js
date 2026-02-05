const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 30 * 1000, 
  max: 30,  
  message: { message: 'Too many requests, please try again later' }
});

module.exports = limiter;
