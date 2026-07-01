import React from "react";
import "../style/Add_Hotel.css";
import star from "../assets/star.png";

const Add_Hotel = () => {
  return (
    <div className="Add_Hotel_Container">
      <div className="hotel_left">
        <img src="" alt="img12" />
        <button className="update">Update</button>
        <button className="delete">Delete</button>
      </div>
      <div className="Hotel_right">
        <div className="Hotel_tittle">
          <span>3 Room Beedroom </span>
          <h4>Sandton City Hotel</h4>
        </div>
        <div className="line"></div>
        <div className="Hotel_body">
          <div>
            <span>4-6 Guest -</span>
            <span>Entire Home -</span>
            <span>5 beds -</span>
            <span>3 bath</span>
          </div>
          <div>
            <span>Wifi -</span>
            <span>Kitchen -</span>
            <span>Free Parking</span>
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
            <span>$325</span>
            <span>/night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_Hotel;
