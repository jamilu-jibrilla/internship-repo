const config = require('../config');

module.exports = function(req, res, next) {
  if (config.maintenance) {
    return res.status(503).json({
      success: false,
      message: 'The server is currently under maintenance. Please try again later.'
    });
  }
  
  next();
};
