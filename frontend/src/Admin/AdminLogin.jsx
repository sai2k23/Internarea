import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./admin.css"

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const LoginAdmin = async () => {
        if (username === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        const bodyjson = {
            username: username,
            password: password
        };

        try {
            const res = await axios.post("https://internareabackend-tdwc.onrender.com/api/admin/adminLogin", bodyjson);
            console.log(res.data, "Admin logged in successfully");
            
            alert("Login successful");
            // Redirect to the admin panel if login is successful
            navigate("/adminepanel");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed";
            console.error("Login error:", errorMessage);
            alert(errorMessage);
        }
    };

    return (
        <div className="admin-login-bg">
            <div className="login-container">
                <h2>Admin Login</h2>
                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <label>Admin Name</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Admin Name" 
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password" 
                    />
                    <button type="button" onClick={LoginAdmin}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
