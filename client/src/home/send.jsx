import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
const Send = () => {
  const navigate=useNavigate()
  const [IsAuthenticated,setIsAuthenticated]=useState(null)
  useEffect(()=>{
   async function CheckAuth(){
    try{
   const res=await axios.post("http://localhost:4000/sendmail",
 {},
  { withCredentials: true } )
   if(res.data.success){

    setIsAuthenticated(true)
   }else{
    alert("session Expired")
    setIsAuthenticated(false)
   }
     }catch(err){
    console.log("Auth Failed",err)
  }
   }

   CheckAuth()
  },[])
  const handlesubmit=()=>{
    if(IsAuthenticated==true){
      navigate('/dashboard')
    }else{
        navigate('/auth/page')
    }
  }
  return (
    <div>
      <button onClick={handlesubmit}>send-email</button>
    </div>
  )
}

export default Send
