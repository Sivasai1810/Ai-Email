import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const router = express.Router()
import verifyToken from '../middleware/verifyToken.js'
import { userModel } from '../database/db.js'
import nodemailer from 'nodemailer'
import GenToken from '../middleware/accessToken.js'
router.post('', verifyToken, GenToken, async (req, res) => {
  try {
const Toemail=req.body.email
const user_subject=req.body.subject
const user_text=req.body.text

    const a_Token =req.accessToken
    const userid = req.user.id
    const exist = await userModel.findOne({ client_id: userid })
    if (!exist) {
      return res.status(404).json({ message: "User not found in DB" })
    }

    const userEmail = exist.client_email
    const Transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: userEmail,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: exist.client_Token,
        accessToken: a_Token
      }
    })

    const mailOptions = {
      from: userEmail,
      to: Toemail,
      subject:user_subject,
      text: user_text,
    }

    const result = await Transporter.sendMail(mailOptions)
    return res.json({
      message: "Email sent successfully",
      info: result
    })

  } catch (err) {
    console.error("Error sending email:", err)
    return res.status(500).json({
      message: "Failed to send email",
      error: err.message
    })
  }
})

export default router
