const User = require("../models/user");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

async function register(req, res) {
    try {
      const newuser = new User(req.body);
  
      await newuser.save();
      res.json({ status: "success", data: newuser });
    } catch (error) {
        next(error)

    }
  }

  async function login (req, res) {
    try {
      const existUser = await User.findOne({ email: req.body.email });
      if (!existUser) {
        res.json({ status: "fail", message: "somthing went wrong 1" });
        return;
      }
      const passwordtest = bcrypt.compareSync(
        req.body.password,
        existUser.password
      );
      if (!passwordtest) {
        res.json({ status: "fail", message: "somthing went wrong 2" });
        return;
      }
      const token = jwt.sign({ id: existUser._id }, "gomycode", {
        expiresIn: "1d",
      });
      res.json({ status: "success", data: token });
    } catch (error) {
   next(error)
    }
  }
  module.exports={register,login}