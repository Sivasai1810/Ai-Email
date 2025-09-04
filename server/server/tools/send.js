import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const router=express.Router()
import verifyToken from '../middleware/verifyToken.js'
router.post('',verifyToken,async(req,res)=>{
res.json({message:"sendemail",
    success:true
})
})
export default router