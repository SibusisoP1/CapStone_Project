import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../action/userActions";
import Profile from "../assets/Profile_Dropdown.png";
import Logo from "../assets/Red_Logo.png";
import "../style/Admin.css";

const Admin_nav = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const isHost = userInfo?.user?.role === "host";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
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
        <div>
          <span className="admin_logout" onClick={handleLogout}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Admin_nav;