import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const router=express.Router()
import verifyToken from '../middleware/verifyToken.js'
import {userModel} from '../database/db.js'
import nodemailer from 'nodemailer'
router.post('',verifyToken,async(req,res)=>{
res.json({message:"sendemail",
    success:true
})
const Toemail=req.body.toemail
const subject=req.body.subject
const user_text=req.body.text
const accessToken=req.cookies.ac_Token
//   console.log("Cookie connect.sid:", req.cookies["connect.sid"]);
const userid=req.user.id
const exist=await userModel.findOne({client_id:userid})
if(exist){
   const userEmail=exist.client_email
    res.json({message:"Retrieving the data from the server."})
}
else{
 return res.json({message:"Internal server Error"})
}
const Transpoter= nodemailer.createTransport({
     host:"smtp.gmail.com",
     port:465,
     secure:true,
     auth:{
        type:'OAUTH2',
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
     }
})
Transpoter.sendMail({
    from: userEmail,
    to: Toemail,
    subject: subject,
    text:user_text,
    auth:{
        
    }
    

})



})
export default router