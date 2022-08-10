const mongoose=require('mongoose');
const {User}=require('./userModel')
const debateSchema=mongoose.Schema(
    {
        debateName:{type:String,trim:true},
        isGroupdebate:{type:Boolean,default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"latestMessage"
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"GroupAdmin"
        }

    },{
        timestamps:true,
    }
)

const Debate=mongoose.model("Debate", debateSchema);
module.exports=Debate;