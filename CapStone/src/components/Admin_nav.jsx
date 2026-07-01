import React from "react";
import { Link } from "react-router-dom";
import Profile from "../assets/Profile_Dropdown.png";
import Logo from "../assets/Red_Logo.png";
import "../style/Admin.css";

const Admin_nav = () => {
  return (
    <div className="admin_nav_container">
      <div className="admin_nav_top">
        <div className="admin_logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="admin_profile">
          <span>John Doe</span>
          <span>
            <img src={Profile} alt="" />
          </span>
        </div>
      </div>
      <div className="admin_nav_bottom">
        <div>
          <Link to="/admin/reservations">
            <span>View Reservation</span>
          </Link>
        </div>
        <div>
          <Link to="/admin/view-listing">
            <span>View Listing</span>
          </Link>
        </div>
        <div>
          <Link to="/admin/create-listing">
            <span>Create Listing</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin_nav;