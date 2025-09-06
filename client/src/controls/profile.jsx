import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
const handlelogout=async()=>{
const res=await axios.post("http://localhost:4000/req/logout",{},{
    withCredentials:true
})
console.log(res.data.message)
alert(res.data.message)
window.location.reload(); 
}
    useEffect(()=>{
        try{
async function fetchProfile(){
const res=await axios.post("http://localhost:4000/auth/profile",{},{
    withCredentials:true
})
setEmail(res.data.info.email)
setName(res.data.info.username)
}
console.log("All Fine!")
fetchProfile()
        }catch(err){
           alert("User Not Found!")
        }
    },[])
     return (
    <div>
      <h2>Profile</h2>
      <img src='' alt='userlogo'></img>
      <p>{name}</p>
      <p>{email}</p>
      <button onClick={handlelogout}>Log-Out</button>
    </div>
  )
}
export default Profile
