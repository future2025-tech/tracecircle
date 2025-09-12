import React, { useState } from "react";
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
import { IoIosArrowDown } from "react-icons/io";

function SidebarLayout() {
  const navigate = useNavigate();
  const [openOrg, setOpenOrg] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); 
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
          {/* Organization Group */}
          <div 
            className="menu-item" 
            onClick={() => setOpenOrg(!openOrg)} 
            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <span><GoOrganization /> &nbsp;&nbsp; Organization</span>
            <IoIosArrowDown style={{ transform: openOrg ? "rotate(180deg)" : "rotate(0)", transition: "0.3s" }} />
          </div>
          {openOrg && (
            <div className="submenu">
              <Link to="/organization"><GoOrganization /> &nbsp;&nbsp; Organization Master</Link>
              <Link to="/department"><SlOrganization /> &nbsp;&nbsp; Department Master</Link>
              <Link to="/employee"><VscOrganization /> &nbsp;&nbsp; Employee Master</Link>
            </div>
          )}

          {/* Product Group */}
          <div 
            className="menu-item" 
            onClick={() => setOpenProduct(!openProduct)} 
            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <span><BsBox /> &nbsp;&nbsp; Product</span>
            <IoIosArrowDown style={{ transform: openProduct ? "rotate(180deg)" : "rotate(0)", transition: "0.3s" }} />
          </div>
          {openProduct && (
            <div className="submenu">
              <Link to="/product"><BsBox /> &nbsp;&nbsp; Product Master</Link>
              <Link to="/logistic"><ImTruck /> &nbsp;&nbsp; Logistic Master</Link>
              <Link to="/supply"><MdFactory /> &nbsp;&nbsp; Supply Master</Link>
              <Link to="/retailer"><BsShop /> &nbsp;&nbsp; Retailer Master</Link>
            </div>
          )}

          {/* Role (separate) */}
          <Link to="/role"><IoPersonCircleOutline /> &nbsp;&nbsp; Role Master</Link>
          
          {/* Screen (separate) */}
          <Link to="/screen"><MdOutlineMonitor /> &nbsp;&nbsp; Screen Master</Link>
        </nav>

        {/* Logout Button */}
        <button onClick={handleLogout} style={{marginTop: "auto",background: "red",color: "white",padding: "10px",border: "none",borderRadius: "6px",cursor: "pointer",width: "100%"}}>Logout</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarLayout;
