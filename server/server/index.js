import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './config/passport.js';
import signup from './auth/signup.js'
import login from './auth/login.js'
import callback from './callback/callback.js'
import {connect} from './database/db.js'
import sendmail from "./tools/sendmail.js"
import send from './tools/send.js'
import markup from './tools/aimessage.js'
try{
const app=express()
app.use(express.json())
connect()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'] 
}))
app.use(session({
secret:"our-secert",
resave:false,
saveUninitialized:false,
cookie:{
    httpOnly:true,
    sameSite:'lax',
    secure:false,
    maxAge:1000*60*60*24*7
}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use('/auth/signup',signup)
app.use('/auth/callback/url',callback)
app.use('/auth/login',login)
app.use('/sendreq',send)
app.use('/req/send/email',sendmail)
app.use('/prompt/message',markup)
app.listen(process.env.PORT,()=>{
    console.log("Server has been started!")
    console.log("Port:", process.env.PORT || 4000)
    console.log("MongoDB URL:", process.env.MONGODB_URL ? 'Set' : 'Not set')
    console.log("JWT Secret:", process.env.JWT_SECRET ? 'Set' : 'Not set')
    console.log("CORS Origin:", "http://localhost:5173")
})
}catch(err){
    console.log("err",err)
}
