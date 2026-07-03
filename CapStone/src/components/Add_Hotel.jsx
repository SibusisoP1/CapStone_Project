import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateListing } from "../action/listingAction";
import "../style/Add_Hotel.css";
import star from "../assets/star.png";
import { resolveImageUrl } from "../api/axiosInstance";
import { LOCATIONS, PROPERTY_TYPES } from "../constants/options";

const Add_Hotel = ({ hotel, onDelete }) => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(hotel ? { ...hotel } : {});
  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState(
    hotel && Array.isArray(hotel.amneties) ? [...hotel.amneties] : [],
  );
  const [image, setImage] = useState(null);

  if (!hotel) return null;

  const displayAmenities = Array.isArray(hotel.amneties) ? hotel.amneties : [];

  const handleUpdateClick = () => {
    setShowEditModal(true);
    setEditData({ ...hotel });
    setAmenities(displayAmenities);
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addAmenity = () => {
    const value = amenityInput.trim();
    if (value && !amenities.includes(value)) {
      setAmenities([...amenities, value]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handleSaveUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("location", editData.location);
    formData.append("description", editData.description);
    formData.append("bedroom", editData.bedroom);
    formData.append("bathroom", editData.bathroom);
    formData.append("type", editData.type);
    formData.append("guest", editData.guest);
    formData.append("price", editData.price);
    formData.append("amneties", JSON.stringify(amenities));
    if (image) {
      formData.append("img", image);
    }

    dispatch(updateListing(hotel._id, formData));
    setShowEditModal(false);
  };

  return (
    <div className="Add_Hotel_Container">
      <div className="hotel_left">
        <img src={resolveImageUrl(hotel.img)} alt={hotel.name} />
        <button className="update" onClick={handleUpdateClick}>
          Update
        </button>
        <button className="delete" onClick={() => onDelete(hotel._id)}>
          Delete
        </button>
      </div>
      <div className="Hotel_right">
        <div className="Hotel_tittle">
          <span>
            {hotel.bedroom} Bedroom {hotel.type}
          </span>
          <h4>{hotel.name}</h4>
        </div>
        <div className="line"></div>
        <div className="Hotel_body">
          <div>
            <span>{hotel.guest} Guest -</span>
            <span>{hotel.type} -</span>
            <span>{hotel.bedroom} beds -</span>
            <span>{hotel.bathroom} bath</span>
          </div>
          <div>
            {displayAmenities.length > 0 ? (
              <span>{displayAmenities.join(" - ")}</span>
            ) : (
              <span>No amenities listed</span>
            )}
          </div>
          <div>
            <span>{hotel.location}</span>
          </div>
        </div>
        <div className="line"></div>
        <div className="Hotel_footer">
          <div className="rev">
            <span>5.0</span>
            <span>
              <img src={star} alt="" />
            </span>
            <span>(319 reviews)</span>
          </div>
          <div>
            <span>${hotel.price}</span>
            <span>/night</span>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="modal_overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <div className="modal_header">
              <h2>Edit Hotel</h2>
              <button
                className="close_btn"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSaveUpdate} className="edit_form">
              <div className="form_group">
                <label>Hotel Name</label>
                <input
                  type="text"
                  value={editData.name || ""}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="form_group">
                <label>Location</label>
                <select
                  value={editData.location || ""}
                  onChange={(e) => handleEditChange("location", e.target.value)}
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
              <div className="form_group">
                <label>Description</label>
                <input
                  type="text"
                  value={editData.description || ""}
                  onChange={(e) =>
                    handleEditChange("description", e.target.value)
                  }
                  required
                />
              </div>
              <div className="form_group">
                <label>Type</label>
                <select
                  value={editData.type || ""}
                  onChange={(e) => handleEditChange("type", e.target.value)}
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
              <div className="form_group">
                <label>Bedrooms</label>
                <input
                  type="number"
                  value={editData.bedroom || 0}
                  onChange={(e) =>
                    handleEditChange("bedroom", parseInt(e.target.value))
                  }
                  required
                />
              </div>
              <div className="form_group">
                <label>Bathrooms</label>
                <input
                  type="number"
                  value={editData.bathroom || 0}
                  onChange={(e) =>
                    handleEditChange("bathroom", parseInt(e.target.value))
                  }
                  required
                />
              </div>
              <div className="form_group">
                <label>Guests</label>
                <input
                  type="number"
                  value={editData.guest || 0}
                  onChange={(e) =>
                    handleEditChange("guest", parseInt(e.target.value))
                  }
                  required
                />
              </div>
              <div className="form_group">
                <label>Price (per night)</label>
                <input
                  type="number"
                  value={editData.price || 0}
                  onChange={(e) =>
                    handleEditChange("price", parseInt(e.target.value))
                  }
                  required
                />
              </div>
              <div className="form_group">
                <label>Amenities</label>
                <div className="amenities_input">
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
                    placeholder="Enter amenity and press Enter"
                  />
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
              <div className="form_group">
                <label>Image</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="modal_actions">
                <button type="submit" className="btn_save">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn_cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add_Hotel;
