import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AirBnb_Logo from "../assets/White_Logo.png";
import globe from "../assets/globe.png";
import Search_Button from "../assets/Search_Button.png";
import Profile_Dropdown from "../assets/Profile_Dropdown.png";
import "../style/AirBnb_Nav.css";
import { useDispatch, useSelector } from "react-redux";
import { LOCATIONS } from "../constants/options";
import { logout } from "../action/userActions";

const AirBnb_Nav = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const locations = [
    { id: "all", name: "All Locations" },
    ...LOCATIONS.map((name) => ({ id: name, name })),
  ];

  // Check login state on mount and when localStorage changes
  // useEffect(() => {
  //   const checkLoginStatus = () => {
  //     const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
  //     setIsLoggedIn(loginStatus);
  //   };

  //   checkLoginStatus();

  //   // Listen for storage changes (for updates from other tabs)
  //   const handleStorageChange = (e) => {
  //     if (e.key === 'isLoggedIn') {
  //       checkLoginStatus();
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   // Also check periodically for changes within the same tab
  //   const interval = setInterval(checkLoginStatus, 1000);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //     clearInterval(interval);
  //   };
  // }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const formatDate = (date) => {
    if (!date) return "Add dates";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleLocationClick = (e) => {
    e.stopPropagation();
    setShowLocationPicker(!showLocationPicker);
    setShowCheckInPicker(false);
    setShowCheckOutPicker(false);
    setShowGuestPicker(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
    if (location.id === "all") {
      navigate("/locations");
    } else {
      navigate(`/locations?location=${encodeURIComponent(location.name)}`);
    }
  };

  const handleCheckInClick = (e) => {
    e.stopPropagation();
    setShowCheckInPicker(!showCheckInPicker);
    setShowCheckOutPicker(false);
    setShowGuestPicker(false);
    setShowLocationPicker(false);
  };

  const handleCheckOutClick = (e) => {
    e.stopPropagation();
    setShowCheckOutPicker(!showCheckOutPicker);
    setShowCheckInPicker(false);
    setShowGuestPicker(false);
    setShowLocationPicker(false);
  };

  const handleGuestClick = (e) => {
    e.stopPropagation();
    setShowGuestPicker(!showGuestPicker);
    setShowCheckInPicker(false);
    setShowCheckOutPicker(false);
    setShowLocationPicker(false);
  };

  const handleDateInputChange = (e, callback) => {
    e.stopPropagation();
    const date = new Date(e.target.value);
    callback(date);
  };

  const updateGuests = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, value),
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate("/");
  };

  const totalGuests = guests.adults + guests.children;
  const guestText =
    totalGuests === 0
      ? "Add guests"
      : `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;
  const locationText = selectedLocation
    ? selectedLocation.name
    : "Select Location";

  return (
    <nav>
      <div className="nav">
        <Link to="/">
          <img src={AirBnb_Logo} alt="Logo" className="logo" />
        </Link>

        <div className="nav_group">
          <Link to="/locations">
            <span>Places to stay</span>
          </Link>
          <span>Experiences</span>
          <span>Online Experiences</span>
        </div>

        <div className="nav_group nav_foot">
          <Link to="/login">
            <span>Become a host</span>
          </Link>
          <span>
            <img src={globe} alt="" />
          </span>
          <span className="profile_container">
            <img
              src={Profile_Dropdown}
              alt="Profile"
              onClick={toggleDropdown}
              className="profile_dropdown"
            />
            {showDropdown && (
              <div className="profile_dropdown_menu">
                {userInfo ? (
                  <>
                    <Link
                      to="/admin/reservations"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span>Reservations</span>
                    </Link>
                    <div className="dropdown_divider"></div>
                    <span className="logout_link" onClick={handleLogout}>
                      Logout
                    </span>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setShowDropdown(false)}>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="nav_searchbar">
        <div className="search_text clickable" onClick={handleLocationClick}>
          <span className="check_tittle">Location</span>
          <span className="gray_t">{locationText}</span>
          {showLocationPicker && (
            <div
              className="location_picker_popup"
              onClick={(e) => e.stopPropagation()}
            >
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="location_option"
                  onClick={() => handleLocationSelect(location)}
                >
                  <span className="location_name">{location.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="search_text clickable" onClick={handleCheckInClick}>
          <span className="check_tittle">Check-in</span>
          <span className="gray_t">{formatDate(checkIn)}</span>
          {showCheckInPicker && (
            <div
              className="date_picker_popup"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="date"
                value={checkIn ? checkIn.toISOString().split("T")[0] : ""}
                onChange={(e) => handleDateInputChange(e, setCheckIn)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          )}
        </div>
        <div className="search_text clickable" onClick={handleCheckOutClick}>
          <span className="check_tittle">Check-out</span>
          <span className="gray_t">{formatDate(checkOut)}</span>
          {showCheckOutPicker && (
            <div
              className="date_picker_popup"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="date"
                value={checkOut ? checkOut.toISOString().split("T")[0] : ""}
                onChange={(e) => handleDateInputChange(e, setCheckOut)}
                min={
                  checkIn
                    ? checkIn.toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
              />
            </div>
          )}
        </div>
        <div className="search_text clickable" onClick={handleGuestClick}>
          <span className="check_tittle">Guests</span>
          <span className="gray_t">{guestText}</span>
          {showGuestPicker && (
            <div
              className="guest_picker_popup"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="guest_type">
                <div className="guest_info">
                  <span className="guest_label">Adults</span>
                  <span className="guest_age">Ages 13 or above</span>
                </div>
                <div className="guest_controls">
                  <button
                    onClick={() => updateGuests("adults", guests.adults - 1)}
                    disabled={guests.adults <= 1}
                    className={`guest_button ${guests.adults <= 1 ? "disabled" : ""}`}
                  >
                    -
                  </button>
                  <span className="guest_count">{guests.adults}</span>
                  <button
                    onClick={() => updateGuests("adults", guests.adults + 1)}
                    className="guest_button"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="guest_type">
                <div className="guest_info">
                  <span className="guest_label">Children</span>
                  <span className="guest_age">Ages 2-12</span>
                </div>
                <div className="guest_controls">
                  <button
                    onClick={() =>
                      updateGuests("children", guests.children - 1)
                    }
                    disabled={guests.children <= 0}
                    className={`guest_button ${guests.children <= 0 ? "disabled" : ""}`}
                  >
                    -
                  </button>
                  <span className="guest_count">{guests.children}</span>
                  <button
                    onClick={() =>
                      updateGuests("children", guests.children + 1)
                    }
                    className="guest_button"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="guest_type">
                <div className="guest_info">
                  <span className="guest_label">Infants</span>
                  <span className="guest_age">Under 2</span>
                </div>
                <div className="guest_controls">
                  <button
                    onClick={() => updateGuests("infants", guests.infants - 1)}
                    disabled={guests.infants <= 0}
                    className={`guest_button ${guests.infants <= 0 ? "disabled" : ""}`}
                  >
                    -
                  </button>
                  <span className="guest_count">{guests.infants}</span>
                  <button
                    onClick={() => updateGuests("infants", guests.infants + 1)}
                    className="guest_button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="search_button">
          <img src={Search_Button} alt="" />
        </div>
      </div>
    </nav>
  );
};

export default AirBnb_Nav;
