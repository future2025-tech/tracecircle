// layout/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import ColorModeToggle from "./ColorModeToggle";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.text.primary, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.text.primary, 0.1),
  },
  marginLeft: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "30ch",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function Navbar({ drawerWidth, onToggleSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        ml: `${drawerWidth}px`,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        width:"100%",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side: Sidebar toggle + Search */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={onToggleSidebar} edge="start">
            <MenuIcon />
          </IconButton>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search> */}
        </Box>

        {/* Right Side: Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ColorModeToggle />
          <IconButton>
            <Badge badgeContent={3} color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile Menu */}
          <Box onClick={handleProfileClick} sx={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 1 }}>
            <Avatar alt="User" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
            <Typography variant="body2" fontWeight={600} sx={{ display: { xs: "none", sm: "block" } }}>
              James Wilson
            </Typography>
            <KeyboardArrowDownIcon fontSize="small" />
          </Box>

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
              <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><HelpIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Help & Support</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem sx={{ color: "error.main" }}>
              <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: "error.main" }} /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
