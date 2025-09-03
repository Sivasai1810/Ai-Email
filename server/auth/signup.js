import express from 'express'
import passport from "../config/passport.js"
const router=express.Router()
router.use(express.json())
router.get('',passport.authenticate('google',{
    scope:[
        "profile",
        "email",
        // Full Gmail scope ensures XOAUTH2 over SMTP works reliably
        "https://mail.google.com/"
    ],
    accessType:"offline",
    prompt:"consent"

}))
export default router