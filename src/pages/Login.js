// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { MdEmail } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";
// import logo from "../assets/logo Tracecircle.png";
// import { Box, Typography } from "@mui/material";
// import { Image } from "@mui/icons-material";

// function Login() {
//   const inputWrapper = {position: "relative", marginBottom: "20px"};
//   const inputStyle = {height: "40px",width: "280px",borderRadius: "10px",border: "1px solid green",fontSize: "14px", paddingLeft: "35px"};
//   const iconStyle = {position: "absolute",top: "50%",left: "10px",transform: "translateY(-50%)",fontSize: "18px",color: "#333"};
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:8080/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       localStorage.setItem("isLoggedIn", "true"); // ✅ save login flag
//       localStorage.setItem("userEmail", formData.email);
//       navigate("/organization");
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//      <Box
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         height: "100vh",
//         backgroundColor: "#f0f0f0", // Optional background
//         justifyContent: "center", // Center the inner box horizontally
//         alignItems: "center",     // Center the inner box vertically
//       }}
//     >
//       {/* Inner box with fixed width */}
//       <Box
//         sx={{
//           width: 600,
//           display: "flex",
//           flexDirection: "row",
//           alignItems: "center", // center vertically inside this box
//           border: "1px solid green",
//           padding: 2,
//           borderRadius: 2,
//         }}
//       >
//         <Box sx={{ 
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center"
//           }}>
//           <img src={logo} width="200px" height="auto" />
//         </Box>
//         <Box sx={{ 
//           flex: 1,
//           flexDirection: "column",
//           alignItems: "center"
//         }}>
//           <Typography variant="h4">Login</Typography>
          
//         </Box>
//       </Box>
//     </Box>

//     // <div style={{display: "flex",justifyContent: "center",margin: "150px auto"}}>
//     //   <div style={{width: "400px",height: "350px",backgroundColor:"#EEFCF6",border: "1px solid green",borderRadius: "10px 0px 0px 10px",display: "flex",justifyContent: "center",alignItems: "center"}}>
//     //     <img src={logo} style={{ width: "250px" }} alt="logo" />
//     //   </div>

//     //   <div style={{width: "400px",height: "350px",border: "1px solid green",borderRadius: "0px 10px 10px 0px",display: "flex",justifyContent: "center",alignItems: "center"}}>
//     //     <form onSubmit={handleSubmit} style={{width: "80%", display: "flex", flexDirection: "column", gap: "15px"}}>
//     //       <h2 style={{ textAlign: "center" }}>Login</h2>
//     //       <div style={inputWrapper}> 
//     //         <MdEmail style={iconStyle} />
//     //         <input type="email" name="email" placeholder="Email" required style={inputStyle} onChange={handleChange}/>
//     //       </div>

//     //       <div style={inputWrapper}>
//     //         <RiLockPasswordFill style={iconStyle} />
//     //         <input type="password" name="password" placeholder="Password" required style={inputStyle} onChange={handleChange}/>
//     //       </div>
//     //       <Link to="/forgotpassword">Forgot Password?</Link>

//     //       <button type="submit" style={{height: "40px",width:"320px",border: "1px solid green",borderRadius: "10px",backgroundColor: "green",color: "white",fontWeight: "bold",fontSize: "14px"}}>Login</button>

//     //       {/* <p style={{ textAlign: "center", fontSize: "17px" }}>Don’t have an account? <Link to="/signup">Signup</Link></p> */}
//     //     </form>
//     //   </div>
//     // </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from "../assets/logo Tracecircle.png";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Paper,
} from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle login submit
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
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Outer card with two halves */}
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
              Login
            </Typography>

            {/* Email field */}
            <TextField
              label="Email"
              type="email"
              name="email"
              required
              fullWidth
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password field */}
            <TextField
              label="Password"
              type="password"
              name="password"
              required
              fullWidth
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiLockPasswordFill />
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot password link */}
            <Link to="/forgot-password" style={{ fontSize: "14px", color: "green" }}>
              Forgot Password?
            </Link>

            {/* Login button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "green",
                fontWeight: "bold",
                fontSize: "14px",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Login
            </Button>

            {/* Optional Signup */}
            {/* <Typography align="center" sx={{ fontSize: "17px" }}>
              Don’t have an account? <Link to="/signup">Signup</Link>
            </Typography> */}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
