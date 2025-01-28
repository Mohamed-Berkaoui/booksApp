const User = require("../models/user");
const verifyToken = require("./verifyToken");

  async function verifyAdmin(req, res, next) {
    req.fromVerifyAdmin = true;
    verifyToken(req, res, next);
    const currentUser = await User.findById(req.user);
    if (currentUser.role != "admin") {
      res.status(403).json({ status: "fail", message: "not auth+orized3" });
      return; //galha ala
    } 
    next();
  }

  module.exports=verifyAdmin