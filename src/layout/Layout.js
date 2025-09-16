import React, { useState } from "react";
import { Box, Toolbar, useTheme } from "@mui/material";
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

  const theme = useTheme();

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
          p: 0,
        }}
      >
        <Navbar
          drawerWidth={collapsed ? collapsedWidth : drawerWidth}
          onToggleSidebar={handleSidebarCollapseToggle} // Toggle the sidebar from the Navbar
        />
        <Toolbar />
        <Box sx={{ 
          height:"90vh",
          p: 3,
          background:
            theme.palette.mode === "light"
              ? "#fafafaff"
              : theme.palette.background.paper,
           }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
