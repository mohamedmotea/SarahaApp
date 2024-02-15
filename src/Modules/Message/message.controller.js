import Message from "../../../DB/Models/messages.model.js"
import User from './../../../DB/Models/user.model.js';


export const sendMessage = async (req,res,next)=>{
  // desturture the required data from request body and params
  const {content} = req.body
  const {sendTo} = req.params
  // check if user found
  const user = await User.findById(sendTo)
  if(!user) return next(new Error('user not found',{cause:404}))

  // create a new message 
  const message = new Message({  content,  sendTo  })
  await message.save()
  if(!message) return next(new Error('send message fail ',{cause:400}))
  res.status(201).json({message:'send message success',
  success: true
})
}

export const deleteMessage = async (req,res,next)=>{
  const {msgId} = req.params
  const {id} = req.user
  const message = await Message.findOneAndDelete({_id:msgId,sendTo:id})
  if(!message) return next(new Error('delete message fail ',{cause:400}))
  res.status(200).json({
    message: 'Deleted Message Successfully',
    success: true
  })
}