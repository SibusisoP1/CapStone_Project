import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../action/userActions";
import Profile from "../assets/Profile_Dropdown.png";
import Logo from "../assets/Red_Logo.png";
import "../style/Admin.css";
import "../style/AirBnb_Nav.css";

const Admin_nav = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const isHost = userInfo?.user?.role === "host";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <div className="admin_nav_container">
      <div className="admin_nav_top">
        <div className="admin_logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="admin_profile">
          <span>{userInfo?.user?.username || "Guest"}</span>
          <span className="profile_container">
            <img
              src={Profile}
              alt="Profile"
              className="profile_dropdown"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="profile_dropdown_menu">
                <Link to="/admin/reservations" onClick={() => setShowDropdown(false)}>
                  <span>Reservations</span>
                </Link>
                <div className="dropdown_divider"></div>
                <span className="logout_link" onClick={handleLogout}>
                  Logout
                </span>
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="admin_nav_bottom">
        <div>
          <Link to="/admin/reservations">
            <span>View Reservation</span>
          </Link>
        </div>
        {isHost && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Admin_nav;
