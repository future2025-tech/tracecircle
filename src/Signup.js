import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa6";

function Signup() {
  const inputWrapper = {position: "relative", marginBottom: "20px"};
  const inputStyle = {height: "40px",width: "280px",borderRadius: "10px",border: "1px solid green",fontSize: "14px", paddingLeft: "35px"};
  const iconStyle = {position: "absolute",top: "50%",left: "10px",transform: "translateY(-50%)",fontSize: "18px",color: "#333"};
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [passwordErrors, setPasswordErrors] = useState({});
  const navigate = useNavigate();

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  //const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validatePassword(formData.password);
    const isValid = Object.values(errors).every(Boolean);

    if (!isValid) {
      alert("Password does not meet requirements");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    if (res.ok) {
      alert("Signup successful, please login");
      navigate("/login");
    } else {
      alert("Signup failed");
    }
  };

  return (
  <div style={{display: "flex",justifyContent: "center",margin: "30px auto"}}>
      <div style={{width: "400px",height: "640px",border: "1px solid green",borderRadius: "10px 0px 0px 10px",display: "flex",justifyContent: "center",alignItems: "center", backgroundColor:"#EEFCF6"}}>
        <img src={logo} style={{ width: "300px" }} alt="logo" />
      </div>

      <div style={{width: "400px",height: "640px",border: "1px solid green",borderRadius: "0px 10px 10px 0px",display: "flex",justifyContent: "center",alignItems: "center"}}>
        <form onSubmit={handleSubmit} style={{width: "80%", display: "flex", flexDirection: "column", gap: "15px"}}>
          <h2 style={{ textAlign: "center" }}>Signup</h2>
          <div style={inputWrapper}> 
            <MdEmail style={iconStyle} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={inputStyle}/>
          </div>

          <div style={inputWrapper}>
            <RiLockPasswordFill style={iconStyle} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={inputStyle}/>
          </div>

          {/* Real-time password validation */}
          <div style={{ fontSize: "17px", marginTop: "-10px" }}>
            <p>Password must contain:</p>
            <p style={{ color: passwordErrors.length ? "green" : "red" }}>
              {passwordErrors.length ? "✔" : "✘"} At least 8 characters
            </p>
            <p style={{ color: passwordErrors.letter ? "green" : "red" }}>
              {passwordErrors.letter ? "✔" : "✘"} At least 1 letter
            </p>
            <p style={{ color: passwordErrors.number ? "green" : "red" }}>
              {passwordErrors.number ? "✔" : "✘"} At least 1 number
            </p>
            <p style={{ color: passwordErrors.special ? "green" : "red" }}>
              {passwordErrors.special ? "✔" : "✘"} At least 1 special character
            </p>
          </div>

           <div style={inputWrapper}>
            <FaKey style={iconStyle} /> 
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required style={inputStyle}/>
          </div>

          <button type="submit" style={{height: "40px",width:"320px",border: "1px solid green",borderRadius: "10px",backgroundColor: "green",color: "white",fontWeight: "bold",fontSize: "14px"}}>Signup</button>

          <p style={{ textAlign: "center", fontSize: "17px" }}>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
