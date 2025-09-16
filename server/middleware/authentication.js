import jwt from 'jsonwebtoken'

export const isAuthenticated=async (req,res,next)=>{
  try {
    const token=await req.cookies.token;
    console.log(token)
  if(!token){
    return res.status(200).json({
      success:false,
      message:"excess unauthorised!"
    })
    
  }
  
const decoded=jwt.verify(token,process.env.JWT_SECRET);
if(!decoded){
  return res.status(403).json({
    success:false,
    message:"invalid token"
  })
}
  next();

  } catch (error) {
     console.error("❌ Authentication error:", error);
    return res.status(403).json({
      error:"authentication failed!"
    })
    
  }

}