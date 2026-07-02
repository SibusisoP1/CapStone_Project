import React from "react";
import "../style/View_Listing.css";
import Admin_nav from "../components/Admin_nav";

const View_Listing = () => {
  return (
    <div className="Listing_Container">
      <div className="visit_listing">
        <Admin_nav />
      </div>
      <div className="l_container">
        <h1>Create Listing</h1>
        <div className="create_list_container">
          <div className="creating_list_container_detail">
            <div className="listing_name_container">
              <div className="list_name">
                <span>Listing Name</span>
                <input type="text" />
              </div>
              <div className="list_location">
                <span>Location</span>
                <input type="text" />
              </div>
              <div className="list_description">
                <span>Discription</span>
                <input type="text" />
              </div>
            </div>
            <div className="rooms_container">
              <div className="room_detail">
                <div className="room">
                  <span>Rooms</span>
                  <input type="text" />
                </div>
                <div className="baths">
                  <span>Baths</span>
                  <input type="text" />
                </div>
                <div className="types">
                  <span>Types</span>
                  <input type="text" />
                </div>
              </div>
              <div className="room">
                <span>Guest</span>
                <input type="text" />
              </div>
              <div className="amneties_container">
                <div className="amneties">
                  <span>Amneties</span>
                  <input type="text" />
                </div>
                <button>Add</button>
              </div>
            </div>
          </div>
          <button>Upload Image</button>
          <div className="images">
            <span>Images</span>
            <input type="text" />
          </div>
          <div className="btn_create_list">
            <button className="btn_create">Create</button>
            <button className="btn_cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View_Listing;
