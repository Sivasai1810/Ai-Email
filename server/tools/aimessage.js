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
                content:`You are a professional text improver.  
Your task is to transform any text provided by the user into fluent, professional, and natural English.  
- Correct grammar, spelling, and sentence structure.  
- Improve sentence flow and clarity, making it read smoothly.  
- Rewrite awkward or casual phrasing into polished, professional language.  
- Preserve the original meaning, but make the text sound like it was written by a fluent, educated English speaker.  
- Only return the improved text itself. Do not include explanations, reasoning, or <think> sections.  
`
            },
            {
                role:'user',
                content:user_prompt
            }
        ],
        model:"gemma2-9b-it",
    })
    
 return response.choices[0].message
}
router.post('',async(req,res)=>{
const user_prompt=req.body.text
const result=await gentext(user_prompt)
res.json({
    message:result
})
})
export default router