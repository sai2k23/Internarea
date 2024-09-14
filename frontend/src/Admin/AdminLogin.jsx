import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./admin.css"

function AdminLogin() {
    const [username,setusername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const LoginAmin= async()=>{
        if (username===""||password==="") {
            alert("fill the blanks")
        }
        else{
            const bodyjson={
                username:username,
                password:password
            }
            axios.post("https://internareabackend-hui2.onrender.com/api/admin/adminLogin",bodyjson).then((res)=>{
                console.log(res,"data is send")
                alert("success")
                navigate("/adminepanel")
            }).catch((err)=>{
                console.log(err)
            })
        }        
    }


  return (
    <div 
      className="admin-login-bg"
    >
      <div className="login-container">
        <h2>Admin Login</h2>
        <form className="login-form">
          <label>Admin Name</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setusername(e.target.value)} 
            placeholder="Admin Name" 
          />
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
          />
          <button type="button" onClick={LoginAmin}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
