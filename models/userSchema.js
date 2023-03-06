const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter a name'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please enter a valid email'],
        unique:true
    },
    password:{
        type:String,
        min:8,
        max:20,
        unique:true,
        required:[true,'Please enter a strong password']
    }

},{
    timestamps:true
});

UserSchema.pre('save', async function(next){
    const salt=await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)
    next()
 })

UserSchema.methods.giveToken= function(){
    return JsonWebTokenError.sign({id:this._id},process.env.Secrete,{expiresIn:'1d'})
}
const User = mongoose.model('Students',UserSchema);
exports.User= User;
