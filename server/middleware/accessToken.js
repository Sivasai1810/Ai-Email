import dotenv from 'dotenv'
dotenv.config()
import { google } from 'googleapis'
import { userModel } from '../database/db.js'
async function GenToken(req,res,next) {
    try{
 const userid=req.user.id 
const exist=await userModel.findOne({client_id:userid})
if(exist){
    const Refreshtoken=exist.client_Token;
    const OAuth2credentials= new google.auth.OAuth2(
 process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
 process.env.GOOGLE_CALLBACK_URL
)
OAuth2credentials.setCredentials({refresh_token:Refreshtoken})
      const accessTokenResponse = await OAuth2credentials.getAccessToken();
      const token = typeof accessTokenResponse === "string" 
        ? accessTokenResponse 
        : accessTokenResponse?.token;
       
req.accessToken=token
next()
}else{
    res.json({
        message:"unable to find your account"
    })
}

    }catch(err){
        res.json({
            message:"Unable to generate the accesstoken",
            error:err
        })
    }
}


export default GenToken