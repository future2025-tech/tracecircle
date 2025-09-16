import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import BentoIcon from "@mui/icons-material/Bento";
import HelpIcon from "@mui/icons-material/Help";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo Tracecircle.png";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; // Added for the collapse button

const navItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Organizations", icon: <BusinessIcon />, path: "/organization" },
  { text: "Products", icon: <BentoIcon />, path: "/product" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

export default function Sidebar({ drawerWidth, collapsedWidth, collapsed, onCollapseToggle }) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shorter,
            }),
          overflowX: "hidden",
        },
      }}
    >
      {/* Logo */}
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{ height: collapsed ? 30 : 50 }}
        />
      </Toolbar>

      {/* Nav Items */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.text} />}
          </ListItemButton>
        ))}
      </List>

      {/* Support Box */}
      {!collapsed && (
        <Box
          sx={{
            p: 2,
            bgcolor: "success.light",
            borderRadius: 2,
            m: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" fontWeight={600} gutterBottom>
            Need Help?
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Contact support
          </Typography>
          <Button
            startIcon={<HelpIcon />}
            variant="contained"
            color="success"
            size="small"
            fullWidth
          >
            Support
          </Button>
        </Box>
      )}
    </Drawer>
  );
}
