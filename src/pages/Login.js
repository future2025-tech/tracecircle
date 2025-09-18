import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../assets/logo Tracecircle.png";

function Login() {
  const inputWrapper = {position: "relative", marginBottom: "20px"};
  const inputStyle = {height: "40px",width: "280px",borderRadius: "10px",border: "1px solid green",fontSize: "14px", paddingLeft: "35px"};
  const iconStyle = {position: "absolute",top: "50%",left: "10px",transform: "translateY(-50%)",fontSize: "18px",color: "#333"};
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      localStorage.setItem("isLoggedIn", "true"); // ✅ save login flag
      localStorage.setItem("userEmail", formData.email);
      navigate("/organization");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={{display: "flex",justifyContent: "center",margin: "150px auto"}}>
      <div style={{width: "400px",height: "350px",backgroundColor:"#EEFCF6",border: "1px solid green",borderRadius: "10px 0px 0px 10px",display: "flex",justifyContent: "center",alignItems: "center"}}>
        <img src={logo} style={{ width: "250px" }} alt="logo" />
      </div>

      <div style={{width: "400px",height: "350px",border: "1px solid green",borderRadius: "0px 10px 10px 0px",display: "flex",justifyContent: "center",alignItems: "center"}}>
        <form onSubmit={handleSubmit} style={{width: "80%", display: "flex", flexDirection: "column", gap: "15px"}}>
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <div style={inputWrapper}> 
            <MdEmail style={iconStyle} />
            <input type="email" name="email" placeholder="Email" required style={inputStyle} onChange={handleChange}/>
          </div>

          <div style={inputWrapper}>
            <RiLockPasswordFill style={iconStyle} />
            <input type="password" name="password" placeholder="Password" required style={inputStyle} onChange={handleChange}/>
          </div>
          <Link to="/forgotpassword">Forgot Password?</Link>

          <button type="submit" style={{height: "40px",width:"320px",border: "1px solid green",borderRadius: "10px",backgroundColor: "green",color: "white",fontWeight: "bold",fontSize: "14px"}}>Login</button>

          <p style={{ textAlign: "center", fontSize: "17px" }}>Don’t have an account? <Link to="/signup">Signup</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
