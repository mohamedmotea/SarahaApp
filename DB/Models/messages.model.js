import { Schema, model } from "mongoose";


const message_schema = new Schema({
    content:{
      type:String,
      required:true,
      trim:true,
      minLength:3,
      maxLength:299
    },
    sendTo:{
      type:Schema.Types.ObjectId,
      ref:'User',
      required:true
    },
    isVeiwed:{
      type:Boolean,
      default:false
    }
},{timestamps:true})


const Message = model('Message',message_schema);

export default Message