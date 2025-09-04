import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
    const handlecreate=()=>{
   window.location.href='http://localhost:4000/auth/signup'
    }
    const handlelogin=async()=>{
      try{
 const res=await axios.post("http://localhost:4000/auth/login",
{email}
 ,{
 withCredentials: true
 })
 if(res.data.success){
  alert("Login Successfully")
  navigate('/dashboard')
 }
 else{
alert(res.data.message)

 }}catch(err){
  console.log("err",err)
 }
    }
  return (
    <div>
      <button onClick={handlecreate}>SignUpWithGoogle</button>
      <input type='email' placeholder='Enter Your Email' onChange={(e)=>{setEmail(e.target.value)}}></input>
      <button onClick={handlelogin}>Login</button>
    </div>
  )
}

export default Login
