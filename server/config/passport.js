import dotenv from 'dotenv'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
dotenv.config()
passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback:true
    },
async function(req,accessToken,RefreshToken,profile,done) {
 try{
     console.log(RefreshToken)
    const user={
        profile,
        accessToken,
        RefreshToken
    }
    done(null,user)
 }catch(err){
    done(err)}
}))

passport.serializeUser((user,done)=>{
    done(null,user.profile.id)
})
passport.deserializeUser((id,done)=>{
    done(null,{id})
})
export default passport