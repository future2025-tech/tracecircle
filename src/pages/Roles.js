import React from 'react'
import Super_Admin_Roles from '../components/superadmin_components/Super_Admin_Roles'

let role = "super_admin";

const Roles = () => {
   const renderRolesComponent = (role) => {
    switch (role) {
      case "super_admin":
        return <Super_Admin_Roles />;
      // case "manufacture_admin":
      //   return <Super_Admin_Roles />;
      // add more cases here as needed
      default:
        return <div>No access or unknown role</div>;
    }
  };

  return (
    <>
      {renderRolesComponent(role)}
    </>
  );
}

export default Roles