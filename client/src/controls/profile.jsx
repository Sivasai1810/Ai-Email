import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    useEffect(()=>{
async function fetchProfile(){
const res=await axios.post("http://localhost:4000/auth/profile",{},{
    withCredentials:true
})
}
fetchProfile()
    },[])
     return (
    <div>
      
    </div>
  )
}

export default Profile
