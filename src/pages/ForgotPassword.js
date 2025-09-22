// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";
// import logo from "../assets/logo.png";
// import { FaKey } from "react-icons/fa6";

// function ForgotPassword() {
//   const inputWrapper = {position: "relative", marginBottom: "20px"};
//   const inputStyle = {height: "40px",width: "280px",borderRadius: "10px",border: "1px solid green",fontSize: "14px", paddingLeft: "35px"};
//   const iconStyle = {position: "absolute",top: "50%",left: "10px",transform: "translateY(-50%)",fontSize: "18px",color: "#333"};
//   const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: ""});
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     const res = await fetch("http://localhost:8080/api/auth/update-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       alert("Password updated successfully!");
//       navigate("/login");
//     } else {
//       const data = await res.json();
//       alert(data.error || "Something went wrong");
//     }
//   };

//   return (
//     <div style={{display: "flex",justifyContent: "center",margin: "150px auto"}}>
//       <div style={{width: "400px",height: "450px",backgroundColor:"#EEFCF6",border: "1px solid green",borderRadius: "10px 0px 0px 10px",display: "flex",justifyContent: "center",alignItems: "center"}}>
//         <img src={logo} style={{ width: "250px" }} alt="logo" />
//       </div>

//       <div style={{width: "400px",height: "450px",border: "1px solid green",borderRadius: "0px 10px 10px 0px",display: "flex",justifyContent: "center",alignItems: "center"}}>
//         <form onSubmit={handleSubmit} style={{width: "80%", display: "flex", flexDirection: "column", gap: "15px"}}>
//           <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
//           <div style={inputWrapper}> 
//             <MdEmail style={iconStyle} />
//             <input type="email" name="email" placeholder="Enter Email" required style={inputStyle} onChange={handleChange}/>
//           </div>

//           <div style={inputWrapper}>
//             <RiLockPasswordFill style={iconStyle} />
//             <input type="password" name="password" placeholder="Enter New Password" required style={inputStyle} onChange={handleChange}/>
//           </div>

//           <div style={inputWrapper}>
//             <FaKey style={iconStyle} />
//             <input type="password" name="confirmPassword" placeholder="Confirm New Password" required style={inputStyle} onChange={handleChange}/>
//           </div>
//           <Link to="/login">Login</Link>

//           <button type="submit" style={{height: "40px",width:"320px",border: "1px solid green",borderRadius: "10px",backgroundColor: "green",color: "white",fontWeight: "bold",fontSize: "14px"}}>Reset Password</button>

//           <p style={{ textAlign: "center", fontSize: "17px" }}>Don’t have an account? <Link to="/signup">Signup</Link></p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;


import React, { useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment, Paper } from "@mui/material";
import { MdEmail } from "react-icons/md";
import logo from "../assets/logo Tracecircle.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API call to request OTP
    const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("OTP has been sent to your email!");
    } else {
      alert("Error sending OTP. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Outer card */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: 800,
          height:400,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid green",
        }}
      >
        {/* Left side with logo */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#EEFCF6",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid green",
          }}
        >
          <img src={logo} alt="logo" style={{ width: "250px" }} />
        </Box>

        {/* Right side with form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h5" align="center" fontWeight="bold">
              Forgot Password
            </Typography>

            <Typography align="center" sx={{ fontSize: "14px", mb: 1 }}>
              Please enter your email address to receive an OTP
            </Typography>

            {/* Email field */}
            <TextField
              placeholder="Enter your Email ID"
              type="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail />
                  </InputAdornment>
                ),
              }}
            />

            {/* Send OTP button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "green",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Send OTP
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default ForgotPassword;
