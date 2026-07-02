import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/Admin.css";
import Add_Hotel from "../components/Add_Hotel";
import Admin_nav from "../components/Admin_nav";
import { listListing, deleteListing } from "../action/listingAction";

const Admin_add_Hotel = () => {
  const dispatch = useDispatch();

  const listingList = useSelector((state) => state.listingList);
  const { loading, listings, error } = listingList;

  const listingDelete = useSelector((state) => state.listingDelete);
  const { success: deleteSuccess } = listingDelete;

  useEffect(() => {
    dispatch(listListing());
  }, [dispatch, deleteSuccess]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this listing?")) {
      dispatch(deleteListing(id));
    }
  };

  return (
    <div>
      <div className="Admin_Add">
        <Admin_nav />
        <h3>My Hotel List</h3>
        {loading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <h3 className="listing_error">{error}</h3>
        ) : listings.length === 0 ? (
          <p>No listings yet. Create one from "Create Listing".</p>
        ) : (
          listings.map((hotel) => (
            <Add_Hotel
              key={hotel._id}
              hotel={hotel}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Admin_add_Hotel;
