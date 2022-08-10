const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    content:{type:String,trim:true},
    debate:{type:mongoose.Schema.Types.ObjectId,ref:"Debate"},
},{
    timestamps:true,
})

const Message=mongoose.model("Message",messageSchema);

module.exports=Message