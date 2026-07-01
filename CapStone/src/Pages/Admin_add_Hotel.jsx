import React from "react";
import "../style/Admin.css";
import Add_Hotel from "../components/Add_Hotel";
import Admin_nav from "../components/Admin_nav";

const Admin_add_Hotel = () => {
  return (
    <div>
      <div className="Admin_Add">
        <Admin_nav />
        <h3>My Hotel List</h3>
        <Add_Hotel />
      </div>
    </div>
  );
};

export default Admin_add_Hotel;
