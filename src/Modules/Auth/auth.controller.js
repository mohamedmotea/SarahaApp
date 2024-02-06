import sendEmailService from "../Services/send-emails.services.js";
import User from "./../../../DB/Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinaryConnection from './../../utils/cloudinary.js';

export const signUp = async (req, res, next) => {
  // desturture the required data from request body
  const { userName, email, password, gender } = req.body;
  // check this name is valid
  const check = await User.findOne({ email });
  if (check) return next(new Error("email is already exist", { cause: 409 }));
  // verify the email
  const emailToken = jwt.sign({ email }, process.env.VERIFICATION, {
    expiresIn: "2m",
  });
  // send code to email
  const sendCode = await sendEmailService({
    to: email,
    subject: "Saraha Verification",
    message: `<h1>-Verify Code </h1>
    <p>go this link for verify account </p>
    <a href="http://localhost:3000/api/v1/auth/verify/${emailToken}">verify</a>
    `,
  });
  if (!sendCode)
    return next(new Error("send code to email fail", { cause: 400 }));
  // hashed password
  const hashPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDES);
  if (!hashPassword)
    return next(new Error("check you type of password", { cause: 400 }));

  const newUser = new User({
    userName,
    email,
    password: hashPassword,
    gender,
  });
  await newUser.save();
  if (!newUser) return next(new Error("user created fail", { cause: 400 }));

  res
    .status(201)
    .json({ message: "account created successfully", success: true });
};

export const verify = async (req, res, next) => {
  const { token } = req.params;
  const decodeEmail = jwt.verify(token, process.env.VERIFICATION);
  const user = await User.findOne({ email: decodeEmail.email });
  if (!user) return next(new Error("user not found", { cause: 404 }));
  user.isEmailVerified = true;
  await user.save();
  res
    .status(200)
    .json({ message: "account verified successfully", success: true });
};

export const signIn = async (req, res, next) => {
  // desturture the required data from request body
  const { email, password } = req.body;
  // check this name is valid
  const user = await User.findOne({ email });
  if (!user) return next(new Error("email is not exist", { cause: 404 }));
  // verify the password
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch)  return next(new Error("check you type of password", { cause: 400 }));
  // verify the email verification
  if(!user.isEmailVerified ) return next(new Error('email verification is not valid', { cause: 400 }));
  // create token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      gender: user.gender,
      userName: user.userName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    process.env.TOKEN_SIGNATURE,
    {
      expiresIn: process.env.EXPIRESIN,
    }
  );
  // return token
  res.status(200).json({
    message: "login successfully",
    success: true,
    token,
  });
};

export const profilePicture = async (req,res,next)=>{
  // desturture the id from authentication
  const {id} = req.user
  // check if the user uploaded a picture
  if(!req.file) return next(new Error('uploud picture required',{cause:404}))
  // upload to cloudinary
  const {secure_url,public_id} = await cloudinaryConnection().uploader.upload(req.file.path,{
  folder:`${process.env.MAIN_FOLDER}/user/${id}` 
  })
  // update Profile Pic
  const user = await User.findByIdAndUpdate(id,{profilePic:{secure_url,public_id}})
  if(!user) return next(new Error('uploud profile picture fail',{cause:400}))
  res.status(200).json({
    message: 'Updated Profile Picture Successfully',
    success: true
  })
}

export const updateAccount = async (req, res,next) => {
  // desturture the required data from request body
  const { userName, email, newPassword, gender } = req.body;
  const {id} = req.user
  const user = await User.findById(id)
  if(email) {
    const check = await User.findOne({email})
    if(check) return next(new Error("email is already exist", { cause: 409 }))
    // verify the email
    const emailToken = jwt.sign({ email }, process.env.VERIFICATION, {
      expiresIn: "2m",
      });
  // send code to email
  const sendCode = await sendEmailService({
    to: email,
    subject: "Saraha Verification",
    message: `<h1>-Verify Code </h1>
    <p>go this link for verify account </p>
    <a href="http://localhost:3000/api/v1/auth/verify/${emailToken}">verify</a>
    `,
  });
  if (!sendCode)  return next(new Error("send code to email fail", { cause: 400 }));
    user.email = email
  }

  if(newPassword){
    // hashed password
    const hashPassword = bcrypt.hashSync(newPassword, +process.env.SALT_ROUNDES);
    if (!hashPassword)  return next(new Error("check you type of password", { cause: 400 }));
    user.password = hashPassword
  }
  if(gender) user.gender = gender
  if(userName) user.userName = userName

  await user.save()
  if (!user) return next(new Error("user updated fail", { cause: 400 }));

  res.status(200).json({  message: 'Updated Account Successfully',
  success: true})
}

export const deleteAccount = async (req,res,next)=>{
  const {id} = req.user
  const user = await User.findByIdAndDelete(id)
  if(!user) return next(new Error('delete account fail',{cause:400}))
  res.status(200).json({
    message: 'Deleted Account Successfully',
    success: true
  })
}