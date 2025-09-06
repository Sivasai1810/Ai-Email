import express from 'express'
const router=express.Router()
router.post('',async(req,res)=>{
    req.logout(function(err){
        if(err) return next(err)

   req.session.destroy(()=>{
      res.clearCookie('ac_Token', { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
      res.clearCookie('re_Token', { path: '/', httpOnly: true, secure: true, sameSite: 'strict' });
      return res.json({ message: 'Logged out successfully' });
   })
    })
})

export default router