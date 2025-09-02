import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
// import cors from 'cors'
import express from 'express'
import { userModel } from '../database/db.js'
const jwtsecret=process.env.JWT_SECRET
const router=express.Router()
router.use(express.json())
// router.use(cors({
//     Origin:"http://localhost:5713",
//     credentials:true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
//     exposedHeaders: ['Set-Cookie'] 
// }))
router.post('',async(req,res)=>{
    try{
    const useremail=req.body.email
const exist=await userModel.findOne({client_email:useremail})
if(exist){
   const  playLoad={id:exist.client_id}
   console.log(playLoad)
const ac_Token=  jwt.sign(playLoad,jwtsecret,{expiresIn:'2d'})
const re_Token= jwt.sign(playLoad,jwtsecret,{expiresIn:'7d'})
res.cookie("ac_Token",ac_Token,{
httpOnly:true,
secure:false,
maxAge:1000*60*60*24*2,
sameSite:'lax'
})
res.cookie("re_Token",re_Token,{
httpOnly:true,
secure:false,
maxAge:1000*60*60*24*7,
sameSite:'lax'
})
res.json({message:"Login Successfully",
    success:true
})
}else{
    res.json({message:"Account Not Found!",
 success:false
    })
}
    }catch(err){
        res.json({message:"Login Failed",
            success:false,
            error:err
        })
        console.log(err)
    }
})
export default router