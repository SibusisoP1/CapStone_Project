import React from "react";
import "../style/Location.css";
import like_icon from "../assets/like_icon.png";
import star from "../assets/star.png";
import { resolveImageUrl } from "../api/axiosInstance";

const Location = ({ img, location, title, bathrooms, bedrooms, price }) => {
  return (
    <div className="Location">
      <div className="location_container">
        <div className="location_image">
          <img src={resolveImageUrl(img)} alt="location image" />
        </div>
        <div className="location_details">
          <div className="loc_header">
            <div className="loc_titles">
              <span>Entire Home in {location}</span>
              <h2>{title}</h2>
            </div>
            <img src={like_icon} alt="" />
          </div>
          <div className="loc_body">
            <div className="top">
              <span>
                {bathrooms} bathrooms • {bedrooms} bedrooms • Wifi • Kitchen •
                Free parking • Washing machine
              </span>
            </div>
          </div>
          <div className="loc_footer">
            <div className="footer_left">
              <span>5.0</span>
              <img src={star} alt="" />
              <span>(318 reviews)</span>
            </div>
            <div className="footer_right">
              <span className="price">${price}</span>
              <span>/night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
