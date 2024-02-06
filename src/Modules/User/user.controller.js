
import Message from '../../../DB/Models/messages.model.js';
import User from './../../../DB/Models/user.model.js';

export const accountData = async(req,res,next)=>{
  const {id} = req.user
  const user = await User.findById(id).select('-password -isEmailVerified -__v');
  if(!user) return next(new Error('get data fail',{cause:400}))
  res.status(200).json({message:'fetch data success',
  success:true,
  data:user})
}
export const getAccount = async(req,res,next)=>{
  const {userId} = req.params
  const user = await User.findById(userId).select('userName profilePic');
  if(!user) return next(new Error('get data fail',{cause:400}))
  res.status(200).json({message:'fetch data success',
  success:true,
  data:user})
}

export const getAllMessage = async (req,res,next)=>{
  const {id} = req.user
  const messages = await Message.find({sendTo:id}).select('-__v');
  res.status(200).json({message:'fetch data success',
  success:true,
  data:messages
})
}

export const getMessageIsVeiwed = async (req,res,next)=>{
  const {id} = req.user
  const {isVeiwed} = req.query
  const messages = await Message.find({sendTo:id,isVeiwed}).select('-__v');
  res.status(200).json({message:`is Veiwed ${isVeiwed}`,
  success:true,
  data:messages
})
}