import React from 'react';
import Manufacture_Admin_Departments from '../components/manufacture_components/Manufacture_Admin_Departments';
import Super_Admin_Department from '../components/superadmin_components/Super_Admin_Department';

let role = "super_admin"; // can be: "super_admin", "manufacture_admin", etc.
// let role = "manufacture_admin";

const Departments = () => {
  const renderDepartmentComponent = (role) => {
    switch (role) {
      case "super_admin":
        return <Super_Admin_Department />;
      case "manufacture_admin":
        return <Manufacture_Admin_Departments />;
      // add more cases here as needed
      default:
        return <div>No access or unknown role</div>;
    }
  };

  return (
    <>
      {renderDepartmentComponent(role)}
    </>
  );
};

export default Departments;
