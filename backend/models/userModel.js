const mongoose=require('mongoose');
const bcryptjs=require('bcryptjs')
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    dp:{type:String,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
},{
    timestamps:true
})
userSchema.methods.checkPassword=async function(enteredPassword){
    // console.log(enteredPassword)
    // console.log(enteredPassword===this.password)
     
    return await bcryptjs.compare( enteredPassword, this.password)
}

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next()
    }
    const salt=await bcryptjs.genSalt(10);
    this.password=await bcryptjs.hash(this.password,salt);
})
const User=mongoose.model("User",userSchema);

module.exports=User