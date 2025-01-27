const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const connectToDb = require("./utils/connectToDb");
const Book = require("./models/book");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const app = express();
const jwt=require('jsonwebtoken')
connectToDb();

app.use(express.json());


app.post("/api/auth/register", async function (req, res) {
  try {
    const newuser = new User(req.body);
    const salt = bcrypt.genSaltSync(10);
    newuser.password = bcrypt.hashSync(newuser.password, salt);
    await newuser.save();
    res.json({ status: "success", data: newuser });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

app.post("/api/auth/login", async function (req, res) {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
      res.json({ status: "fail", message: "somthing went wrong 1" });
      return;
    }
    const passwordtest=bcrypt.compareSync(req.body.password , existUser.password)
    if(!passwordtest){
        res.json({ status: "fail", message: "somthing went wrong 2" });
        return;
    }

    const token=jwt.sign({id:existUser._id},"gomycode",{expiresIn:"1d"})
    res.json(token)

  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

app.get("/api/book", async function (req, res) {
  try {
    const books = await Book.find();
    res.json({ status: "success", data: books });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

app.post("/api/book", async function (req, res) {
  try {
    const newbook = new Book(req.body);
    await newbook.save();
    res.json({ status: "success", data: newbook });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

mongoose.connection.once("open", function () {
  app.listen(process.env.PORT, function () {
    console.log(`server running on http://localhost:${process.env.PORT}`);
  });
});
mongoose.connection.on("error", function () {
  process.exit(1);
});
