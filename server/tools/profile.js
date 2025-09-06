import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import jwt from 'jsonwebtoken'
const router=express.Router()
import { userModel } from '../database/db.js'
const jwtpassword=process.env.JWT_SECRET
router.post('',async(req, res)=>{
  const userToken= req.cookies.ac_Token
const decoded=await jwt.verify(userToken,jwtpassword)
const userid=decoded.id
const exist=await userModel.findOne({client_id:userid})
if(!exist){
    return res.json({
        message:"uable to fetch the user account"
    })
}
const username=exist.client_name
const email=exist.client_email
res.json({
    message:"User data Fetched Successfully",
    info:{
        username,
        email
    }
})
})
export default router