const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userschema=new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define roles here
        default: 'user'
      },
    expiresIn:{
        type:Date,
    }
},
{
    timestamps:true
});

const User=mongoose.model("User",userschema);
module.exports=User;