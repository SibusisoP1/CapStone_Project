import React from "react";
import "../style/Add_Hotel.css";
import star from "../assets/star.png";
import { resolveImageUrl } from "../api/axiosInstance";

const Add_Hotel = ({ hotel, onDelete }) => {
  if (!hotel) return null;

  const amenities = Array.isArray(hotel.amneties) ? hotel.amneties : [];

  return (
    <div className="Add_Hotel_Container">
      <div className="hotel_left">
        <img src={resolveImageUrl(hotel.img)} alt={hotel.name} />
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
            {amenities.length > 0 ? (
              <span>{amenities.join(" - ")}</span>
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
    </div>
  );
};

export default Add_Hotel;
