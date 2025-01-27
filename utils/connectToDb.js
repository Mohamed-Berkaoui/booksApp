const { default: mongoose } = require("mongoose")

function connectToDb() {
  mongoose.connect(process.env.DB_URI, { dbName: "Books" })
  .then(()=>console.log("connected to db"))
  .catch(e=>console.log(e.message))
}

module.exports=connectToDb