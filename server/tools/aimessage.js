import dotenv from "dotenv"
dotenv.config()
import express from "express"
import Grok from "groq-sdk";
const router=express.Router()
const groq=new Grok({apiKey:process.env.GROQ_API_KEY})
async function gentext(user_prompt) {
    const response=await groq.chat.completions.create({
        messages:[
            {
                role:'system',
                content:'You are an assistant that improves  text. Your job is to correct spelling, grammar, and sentence structure while keeping the meaning the same. Do not change the tone, just make the text clear and professional.'
            },
            {
                role:"user",
                content:user_prompt
            }
        ],
        model:"deepseek-r1-distill-llama-70b",
    })
    
 return response.choices[0].message.content

}
router.post('',async(req,res)=>{
const user_prompt=req.body.text
const result=await gentext(user_prompt)
// console.log(result)
res.json({
    message:result
})
})
export default router