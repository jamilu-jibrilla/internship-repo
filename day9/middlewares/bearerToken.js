const jwtService = require('../services/JwtService'); 

module.exports = function(req, res, next) {
  const token = jwtService.getToken(req);
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided',
      newToken: jwtService.createAccessToken({})
    });
  }
  
  try {
    const decoded = jwtService.verifyAccessToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }
    req.user_id = decoded.id; 
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'An error occurred'
    });
  }
};
