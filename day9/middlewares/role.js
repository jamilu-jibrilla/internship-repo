module.exports = function(req, res, next) {
    const portal = req.path.split('/')[3]; // get portal name from url
    console.log(req)
    if (req?.query?.role !== portal) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Invalid role.'
      });
    }
    
    next();
  };
  