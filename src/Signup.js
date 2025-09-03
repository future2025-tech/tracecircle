import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { MdMail } from "react-icons/md";

function Signup() {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });

    if (res.ok) {
      alert("Signup successful, please login");
      navigate("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "150px auto" }}>
      <div style={{width:"400px", height:"300px", border:"1px solid green", borderRadius:"10px 0px 0px 10px"}}>
      <img src={logo} style={{width:"300px", marginTop:"60px", marginLeft:"45px" }}></img>
      </div>
      <div style={{width:"400px", height:"300px", border:"1px solid green", borderRadius:"0px 10px 10px 0px"}}>
      <form onSubmit={handleSubmit} style={{ width: "300px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2 style={{marginLeft:"150px"}}>Signup</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{height:"40px",width:"300px", border:"1px solid green", borderRadius:"10px", marginLeft:"45px"}}/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{height:"40px",width:"300px", border:"1px solid green", borderRadius:"10px", marginLeft:"45px"}}/>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required style={{height:"40px",width:"300px", border:"1px solid green", borderRadius:"10px", marginLeft:"45px"}}/>
        <button type="submit" style={{height:"40px",width:"300px", border:"1px solid green", borderRadius:"10px", backgroundColor:"green", color:"white", fontWeight:"bold", fontSize:"14px", marginLeft:"45px"}}>Signup</button>
      </form>
      </div>
    </div>
  );
}

export default Signup;
