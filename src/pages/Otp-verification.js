import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import logo from "../assets/logo Tracecircle.png";

function OtpVerification() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    alert("Entered OTP: " + enteredOtp);
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
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: 800,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid green",
        }}
      >
        {/* Left Logo Section */}
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

        {/* Right OTP Section */}
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
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Verify Your Email
            </Typography>

            <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
              Please enter the 6 digit OTP sent to jh*********@.com
            </Typography>

            {/* OTP Boxes */}
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {otp.map((data, index) => (
                <TextField
                  key={index}
                  type="text"
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "20px" },
                  }}
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  sx={{ width: "50px" }}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </Box>

            {/* Resend OTP */}
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                mb: 1,
                cursor: "pointer",
                color: "green",
                textDecoration: "underline",
              }}
              onClick={() => alert("OTP Resent")}
            >
              Resend OTP
            </Typography>

            {/* Verify Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "green",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
            >
              Verify OTP
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default OtpVerification;
 