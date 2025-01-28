const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const connectToDb = require("./utils/connectToDb");
const bookRouter = require("./routers/book");
const authRouter = require("./routers/authRouter");

const app = express();

connectToDb();

app.use(express.json());

app.use("/api/auth",authRouter)
app.use('/api/book',bookRouter)

app.all('*',function(req,res){
  res.json( {status:"fail",message:"404 not found"})
})

app.use(function (err,req,res,next) {
  res.json({ status: "error", message: err.message });
})

mongoose.connection.once("open", function () {
  app.listen(process.env.PORT, function () {
    console.log(`server running on http://localhost:${process.env.PORT}`);
  });
});
mongoose.connection.on("error", function () {
  process.exit(1);
});
