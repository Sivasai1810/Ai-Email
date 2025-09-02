import express from 'express'
import passport from "../config/passport.js"
const router=express.Router()
router.use(express.json())
router.get('',passport.authenticate('google',{
    scope:["profile","email","https://www.googleapis.com/auth/gmail.send"],
    accessType:"offline",
    prompt:"consent"

}))
export default router