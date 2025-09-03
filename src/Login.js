import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      localStorage.setItem("isLoggedIn", "true");  // ✅ save login flag
      navigate("/organization");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "150px auto"}}>
      <img src={logo} style={{width:"400px"}}></img>
      <form onSubmit={handleSubmit} style={{ width: "300px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{height:"40px",width:"300px", border:"1px solid green", borderRadius:"10px"}}/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{height:"40px",width:"300px", border:"1px solid green", borderRadius:"10px"}} />
        <button type="submit" style={{height:"40px",width:"300px", border:"1px solid green", borderRadius:"10px", backgroundColor:"green", color:"white", fontWeight:"bold", fontSize:"14px"}}>Login</button>
        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
