import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 70;

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const handleSidebarCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedWidth}
        collapsed={collapsed}
        onCollapseToggle={handleSidebarCollapseToggle} // Pass the toggle function
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
        }}
      >
        <Navbar
          drawerWidth={collapsed ? collapsedWidth : drawerWidth}
          onToggleSidebar={handleSidebarCollapseToggle} // Toggle the sidebar from the Navbar
        />
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
