import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";
import { GoOrganization } from "react-icons/go";
import { SlOrganization } from "react-icons/sl";
import { VscOrganization } from "react-icons/vsc";
import { BsBox } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { ImTruck } from "react-icons/im";
import { MdFactory } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { MdOutlineMonitor } from "react-icons/md";

function SidebarLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // ✅ clear login
    navigate("/login");
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav>
          <Link to="/organization"><GoOrganization /> &nbsp;&nbsp;&nbsp; Organization</Link>
          <Link to="/department"><SlOrganization /> &nbsp;&nbsp;&nbsp;Department Master</Link>
          <Link to="/product"><VscOrganization /> &nbsp;&nbsp;&nbsp;Product Master</Link>
          <Link to="/employee"><BsBox /> &nbsp;&nbsp;&nbsp;Employee Master</Link>
          <Link to="/role"><IoPersonCircleOutline /> &nbsp;&nbsp;&nbsp;Role Master</Link>
          <Link to="/logistic"><ImTruck /> &nbsp;&nbsp;&nbsp;Logistic Master</Link>
          <Link to="/supply"><MdFactory /> &nbsp;&nbsp;&nbsp;Supply Master</Link>
          <Link to="/retailer"><BsShop /> &nbsp;&nbsp;&nbsp;Retailer Master</Link>
          <Link to="/screen"><MdOutlineMonitor /> &nbsp;&nbsp;&nbsp;Screen Master</Link>
        </nav>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          style={{
            marginTop: "auto",
            background: "red",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarLayout;