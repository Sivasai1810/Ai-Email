import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
const jwtpassword=process.env.JWT_SECRET
const verifyToken=async(req,res,next)=>{ 
    try{
    const accessToken = req.cookies.ac_Token;
    const refreshToken = req.cookies.re_Token;
if(!refreshToken){
   return  res.json({message:"session expired",
        success:false
    })
}
if(!accessToken){
    try {
    const Decoded=jwt.verify(refreshToken,jwtpassword)
    const playLoad={id:Decoded.id}
    const newAccessToken=jwt.sign(playLoad,jwtpassword,{expiresIn:'2d'})
   res.cookie("ac_Token",newAccessToken,{
httpOnly:true,
secure:false,
maxAge:1000*60*60*24*2,
sameSite:'lax'
})
 req.user=Decoded
 return next()
   } catch (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid refresh token!"
        });
      }
}
try{
    const decoded=jwt.verify(accessToken,jwtpassword)
    req.user=decoded
      return next();
    } catch (err) { 
      return res.status(403).json({
        success: false,
        message: err.name === "TokenExpiredError" ? "Access token expired!" : "Invalid access token!"
      });
    }

    }catch (err) {

    return res.status(500).json({
      success: false,
      message: "Authentication failed!"
    });
  }

}
export default verifyToken 