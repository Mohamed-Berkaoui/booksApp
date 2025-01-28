const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,enum:["admin","user"] ,default:"user"},
})

userSchema.pre("save", function(next){
    const user = this;
    user.password =  bcrypt.hashSync(user.password, 8);
    next();
})

const User= mongoose.model('user',userSchema)


module.exports=User