const jwt=require('jsonwebtoken')
function verifyToken(req, res, next) {
    const token = req.headers.Authorization || req.headers.authorization;
    if (!token) {
      res.status(403).json({ status: "fail", message: "not authorized1" });
      return; //galha ala
    }
    jwt.verify(token, "gomycode", function (err, decode) {
      if (err) {
        res.status(403).json({ status: "fail", message: "not auth+orized2" });
        return; //galha ala
      }
      req.user = decode.id;
      if (req.fromVerifyAdmin) {
        return;
      }
      next();
    });
  }

  module.exports=verifyToken