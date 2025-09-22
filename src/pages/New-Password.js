import React from 'react';
import logo from "../assets/logo Tracecircle.png"
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/VpnKey';
// import Image from 'mui-image'; // Optional: or use <img>

export default function ChangePasswordPage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      }}
    >
      <Box
        sx={{
          width: '900px',
          height: '500px',
          display: 'flex',
          border: '1px solid #4CAF50',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 2,
        }}
      >
        {/* Left Side - Logo */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#E8F5E9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <img
            src={logo} // Replace with your logo
            alt="Trace Circle Logo"
            style={{ width: '60%', maxWidth: '250px' }}
          />
        </Box>

        {/* Right Side - Form */}
        <Box
          sx={{
            flex: 1,
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Change New Password
          </Typography>

          <Typography variant="body2" mb={3} color="text.secondary">
            Your new password must be different from previously used password.
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter new Password"
            type="password"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
              },
            }}
          />

          <TextField
            fullWidth
            placeholder="Confirm Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
              },
            }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#0B8F27',
              '&:hover': {
                backgroundColor: '#0a7f21',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '6px',
              py: 1.5,
            }}
          >
            Save Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
