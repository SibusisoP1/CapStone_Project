import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "../style/Locations.css";
import Location from "../components/Location";
import { useDispatch, useSelector } from "react-redux";
import { listListing } from "../action/listingAction";

const Locations = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const selectedLocation = searchParams.get("location");

  const listingList = useSelector((state) => state.listingList);
  const { loading, listings, error } = listingList;

  useEffect(() => {
    dispatch(listListing());
  }, [dispatch]);

  const filteredListings = selectedLocation
    ? listings.filter(
        (listing) =>
          listing.location &&
          listing.location.toLowerCase() === selectedLocation.toLowerCase(),
      )
    : listings;

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

      {selectedLocation && (
        <div className="location_filter_banner">
          <span>Showing stays in {selectedLocation}</span>
        </div>
      )}

      {/* this is where the rest of the other location be  */}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : filteredListings.length === 0 ? (
        <h3>No hotels found{selectedLocation ? ` in ${selectedLocation}` : ""}.</h3>
      ) : (
        filteredListings.map((listing) => (
          <Link
            key={listing._id}
            to={`/location/${listing._id}`}
            className="location_link"
          >
            <Location
              img={listing.img}
              location={listing.location}
              title={listing.name}
              description={listing.description}
              price={listing.price}
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default Locations;
