// layout/Layout.jsx
import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 70;

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedWidth}
        collapsed={collapsed}
      />

      <Box
        component="main"
        // sx={{
        //   flexGrow: 1,
        //   minHeight: "100vh",
        //   ml: collapsed ? `${collapsedWidth}px` : `${drawerWidth}px`,
        //   bgcolor: "background.default",
        //   transition: (theme) =>
        //     theme.transitions.create("margin", {
        //       easing: theme.transitions.easing.sharp,
        //       duration: theme.transitions.duration.shorter,
        //     }),
        // }}

        sx={{
    flexGrow: 1,
    p: 1,
    // ❌ remove this line:
    // ml: `${collapsed ? collapsedWidth : drawerWidth}px`,
  }}
      >
        <Navbar
          drawerWidth={collapsed ? collapsedWidth : drawerWidth}
          onToggleSidebar={() => setCollapsed(!collapsed)}
        />
        <Toolbar />
        <Box  sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
