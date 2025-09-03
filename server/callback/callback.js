import express from 'express'
import passport from '../config/passport.js'
import { userModel } from '../database/db.js'
const router=express.Router()
router.use(express.json())
router.get('',passport.authenticate('google',{
    failureRedirect:'/login/error'
}),async(req,res)=>{
    const exist=await userModel.findOne({client_id:req.user.profile.id})
    const incomingRefreshToken = req.user.RefreshToken
    if(!exist){
        const newuser=new userModel({
            client_id:req.user.profile.id,
            client_name: req.user.profile.displayName,
            client_email:req.user.profile.emails[0].value,
            client_Token: incomingRefreshToken
        })
        await newuser.save()
        return res.json({message:"Account Created successfully",
            success:true,
             redirectUrl: "http://localhost:4000/auth/page"
        })
    }
    // If Google returned a new refresh token (after re-consent), update it
    if (incomingRefreshToken) {
        exist.client_Token = incomingRefreshToken
        await exist.save()
        return res.json({
            message: "Account updated with new refresh token",
            success: true
        })
    }
    res.json({message:"Account already exist"})
})
export default router