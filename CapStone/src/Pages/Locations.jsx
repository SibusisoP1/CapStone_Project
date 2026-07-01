import React, { useEffect } from "react";
import "../style/Locations.css";
import Location from "../components/Location";
import { useDispatch, useSelector } from "react-redux";
import { listListing } from "../action/listingAction";

const Locations = () => {
  const dispatch = useDispatch();

  const listingList = useSelector((state) => state.listingList);
  const { loading, listings, error } = listingList;

  useEffect(() => {
    dispatch(listListing());
  }, [dispatch]);

  return (
    <div className="locations_container">
      <div className="locations_nav">
        <div className="location_cell">
          <span>Free Cancelation</span>
        </div>
        <div className="location_cell">
          <span>Type of place</span>
        </div>
        <div className="location_cell">
          <span>Price</span>
        </div>
        <div className="location_cell">
          <span>Instant Book</span>
        </div>
        <div className="location_cell">
          <span>More filters</span>
        </div>
      </div>

      {/* this is where the rest of the other location be  */}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        listings.map((listing) => (
          <Location
            key={listing.id}
            img={listing.img}
            location={listing.location}
            title={listing.title}
            description={listing.description}
            price={listing.price}
          />
        ))
      )}
    </div>
  );
};

export default Locations;
