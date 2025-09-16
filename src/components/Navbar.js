import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  ButtonBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Collapse button
import ColorModeToggle from "./ColorModeToggle"; // Color mode toggle
import { useNavigate } from "react-router-dom";

export default function Navbar({ drawerWidth, onToggleSidebar }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); 
    navigate("/login");
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        ml: `${drawerWidth}px`,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side: Sidebar toggle */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={onToggleSidebar} edge="start">
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Right Side: Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ColorModeToggle /> {/* Color Mode Toggle */}

          <IconButton>
            <Badge badgeContent={3} color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <Box
            onClick={handleProfileClick}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 1,
            }}
          >
            <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              James Wilson
            </Typography>
            <KeyboardArrowDownIcon fontSize="small" />
          </Box>

          {/* Profile Menu Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: { borderRadius: 2, minWidth: 180 },
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <HelpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Help & Support</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ color: "error.main" }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: "error.main" }} />
              </ListItemIcon>
              <ListItemText onClick={handleLogout}>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
