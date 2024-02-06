import { Schema, model } from "mongoose";

const user_schema = new Schema({
  userName:{
    type:String,
    required:true,
    trim:true,
    lowerCase:true,
    minLength:3,
    maxLength:99
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  gender:{
    type:String,
    enum:['male','female','ذكر','انثي'],
    default:'male'
  },
  password:{
    type:String,
    required:true,
    minLength:3,

  },
  profilePic:{
    secure_url:{type:String},
    public_id:{type:String, unique:true}
  },
  isEmailVerified:{
    type:Boolean,
    default:false,
  }

},{timestamps:true});



const User = model('User',user_schema)

export default User