import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/View_Listing.css";
import Admin_nav from "../components/Admin_nav";
import { createListing } from "../action/listingAction";
import { LISTING_CREATE_RESET } from "../types/listingTypes";
import { LOCATIONS, PROPERTY_TYPES } from "../constants/options";

const View_Listing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState("");
  const [baths, setBaths] = useState("");
  const [type, setType] = useState("");
  const [guest, setGuest] = useState("");
  const [price, setPrice] = useState("");
  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [image, setImage] = useState(null);

  const listingCreate = useSelector((state) => state.listingCreate);
  const { loading, error, success } = listingCreate;

  useEffect(() => {
    if (success) {
      navigate("/admin/view-listing");
      dispatch({ type: LISTING_CREATE_RESET });
    }
  }, [success, navigate, dispatch]);

  const addAmenity = () => {
    const value = amenityInput.trim();
    if (value) {
      setAmenities([...amenities, value]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("bedroom", rooms);
    formData.append("bathroom", baths);
    formData.append("type", type);
    formData.append("guest", guest);
    formData.append("price", price);
    formData.append("amneties", JSON.stringify(amenities));
    if (image) {
      formData.append("img", image);
    }

    dispatch(createListing(formData));
  };

  return (
    <div className="Listing_Container">
      <div className="visit_listing">
        <Admin_nav />
      </div>
      <div className="l_container">
        <h1>Create Listing</h1>
        {error && <p className="listing_error">{error}</p>}
        <form className="create_list_container" onSubmit={handleSubmit}>
          <div className="creating_list_container_detail">
            <div className="listing_name_container">
              <div className="list_name">
                <span>Listing Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="list_location">
                <span>Location</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="">Select a location</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="list_description">
                <span>Discription</span>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="rooms_container">
              <div className="room_detail">
                <div className="room">
                  <span>Rooms</span>
                  <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    required
                  />
                </div>
                <div className="baths">
                  <span>Baths</span>
                  <input
                    type="number"
                    value={baths}
                    onChange={(e) => setBaths(e.target.value)}
                    required
                  />
                </div>
                <div className="types">
                  <span>Types</span>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select a type</option>
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="room">
                <span>Guest</span>
                <input
                  type="number"
                  value={guest}
                  onChange={(e) => setGuest(e.target.value)}
                  required
                />
              </div>
              <div className="room">
                <span>Price (per night)</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="amneties_container">
                <div className="amneties">
                  <span>Amneties</span>
                  <input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAmenity();
                      }
                    }}
                  />
                </div>
                <button type="button" onClick={addAmenity}>
                  Add
                </button>
              </div>
              {amenities.length > 0 && (
                <ul className="amenity_list">
                  {amenities.map((a, i) => (
                    <li key={`${a}-${i}`}>
                      {a}
                      <button
                        type="button"
                        className="remove_amenity"
                        onClick={() => removeAmenity(i)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="images">
            <span>Image</span>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="btn_create_list">
            <button className="btn_create" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
            <button
              className="btn_cancel"
              type="button"
              onClick={() => navigate("/admin/view-listing")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default View_Listing;
