const mongoose=require('mongoose')


const commentSchema=new mongoose.Schema({
    comment:{type:String,required:true},
    userId:{type:mongoose.Types.ObjectId,required:true,ref:"user"},
    bookId:{type:mongoose.Types.ObjectId,required:true,ref:"book"}
})

const Comment=mongoose.model("comment",commentSchema)

module.exports=Comment
