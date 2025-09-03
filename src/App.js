// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import Organization from "./pages/Organization";
// import Department from "./pages/Department";
// import Product from "./pages/Product";
// import Employee from "./pages/Employee";
// import Role from "./pages/Role";
// import Logistic from "./pages/Logistic";
// import Supply from "./pages/Supply";
// import Retailer from "./pages/Retailer";
// import Screen from "./pages/Screen";
// import Signup from "./Signup";
// import Login from "./Login";
// import { GoOrganization } from "react-icons/go";
// import { SlOrganization } from "react-icons/sl";
// import { VscOrganization } from "react-icons/vsc";
// import { BsBox } from "react-icons/bs";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import { ImTruck } from "react-icons/im";
// import { MdFactory } from "react-icons/md";
// import { BsShop } from "react-icons/bs";
// import { MdOutlineMonitor } from "react-icons/md";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="app-container">
//         {/* Sidebar */}
//         <div className="sidebar">
//           <div className="logo-container">
//             <img src="logo.png" alt="Trace Circle Logo" className="logo" />
//           </div>

//           <nav>
//             <Link to="/organization"><GoOrganization /> &nbsp;&nbsp;&nbsp;Organization</Link>
//             <Link to="/department"><SlOrganization /> &nbsp;&nbsp;&nbsp;Department Master</Link>
//             <Link to="/employee"><VscOrganization /> &nbsp;&nbsp;&nbsp;Employee Master</Link>
//             <Link to="/product"><BsBox /> &nbsp;&nbsp;&nbsp;Product Master</Link>
//             <Link to="/role"><IoPersonCircleOutline /> &nbsp;&nbsp;&nbsp;Role Master</Link>
//             <Link to="/logistic"><ImTruck /> &nbsp;&nbsp;&nbsp;Logistic Master</Link>
//             <Link to="/supply"><MdFactory /> &nbsp;&nbsp;&nbsp;Supply Master</Link>
//             <Link to="/retailer"><BsShop /> &nbsp;&nbsp;&nbsp;Retailer Master</Link>
//             <Link to="/screen"><MdOutlineMonitor /> &nbsp;&nbsp;&nbsp;Screen Master</Link>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div className="main-content">
//           <Routes>
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//             <Route path="/organization" element={<Organization />} />
//             <Route path="/department" element={<Department />} />
//             <Route path="/product" element={<Product />} />
//             <Route path="/employee" element={<Employee />} />
//             <Route path="/role" element={<Role />} />
//             <Route path="/logistic" element={<Logistic />} />
//             <Route path="/supply" element={<Supply />} />
//             <Route path="/retailer" element={<Retailer />} />
//             <Route path="/screen" element={<Screen />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Organization from "./pages/Organization";
import Department from "./pages/Department";
import Product from "./pages/Product";
import Employee from "./pages/Employee";
import Role from "./pages/Role";
import Logistic from "./pages/Logistic";
import Supply from "./pages/Supply";
import Retailer from "./pages/Retailer";
import Screen from "./pages/Screen";
import SidebarLayout from "./SidebarLayout";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <Routes>
        {/* Auth pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard routes */}
        <Route
          element={isLoggedIn ? <SidebarLayout /> : <Navigate to="/login" />}
        >
          <Route path="/organization" element={<Organization />} />
          <Route path="/department" element={<Department />} />
          <Route path="/product" element={<Product />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/role" element={<Role />} />
          <Route path="/logistic" element={<Logistic />} />
          <Route path="/supply" element={<Supply />} />
          <Route path="/retailer" element={<Retailer />} />
          <Route path="/screen" element={<Screen />} />
        </Route>

        {/* Default route → login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;