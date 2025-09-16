import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
export const CreateAccount = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "fill all entities",
      });
    }
    const CheckUserExistance = await User.findOne({ email });
    if (CheckUserExistance) {
      return res.status(403).json({
        message: "this email exists already",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email:email,
      password: hashPassword,
    });
    await newUser.save();

    const token=jwt.sign(
      {
        id:newUser._id,
        email:newUser.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn:process.env.JWT_EXPIRES_IN
      }
      
    )
    res.status(200).cookie("token", token, { httpOnly: true,sameSite:'strict',maxAge:86400*1000, }).json({
      message:"Account created succesfully",
      token,
      user:{
        fullName:newUser.name,
        id:newUser._id,
        email:newUser.email
      }
    })
  } catch (error) {
    console.error("Error in CreateAccount:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred while creating the account.",
    });
  }
};


export const LoginAccount=async(req,res)=>{
  try {
    const{email,password}=req.body;
  if(!email || !password){
    return res.status(403).json({
      message:"fill required entity(email & password)"
    })
  }
  const CheckUser=await User.findOne({email});
  if(!CheckUser){
    return res.status(403).json({
      message:"incorrect email or password"
    })
  }
  const CheckPassword=await bcrypt.compare(password,CheckUser.password)
  if(!CheckPassword){
    return res.status(403).json({
      message:"incorrect password"
    })
  }
  res.status(200).json({
    message:`wellcome back ${CheckUser.name}`
  })
  } catch (error) {
    res.status(403).json({
      error:"login error occured!"
    })
  }
}
