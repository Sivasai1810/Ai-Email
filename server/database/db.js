import dotenv from 'dotenv'
dotenv.config()
import mongodb from 'mongoose'
export  async function connect(){
    try{
    await mongodb.connect(process.env.MONGODB_URL)
    console.log("mongodb connected sucessfully")
    }catch(err){
        console.log("unable to connect the mongodb")
    }
}
const userschema=new mongodb.Schema({
client_id:String,
client_name:String,
client_email:String,
client_Token:String
})
export const userModel=mongodb.model("userModel",userschema)

