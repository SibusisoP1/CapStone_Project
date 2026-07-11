import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin_nav from "../components/Admin_nav";
import "../style/Admin.css";
import {
  listReservations,
  deleteReservation,
  updateReservation,
} from "../action/reservationAction";
import { RESERVATION_UPDATE_RESET } from "../types/reservationTypes";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
};

const Reservetion = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [editCheckin, setEditCheckin] = useState("");
  const [editCheckout, setEditCheckout] = useState("");
  const [editHotelName, setEditHotelName] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const isHost = userInfo?.user?.role === "host";

  const reservationList = useSelector((state) => state.reservationList);
  const { loading, error, reservations } = reservationList;

  const reservationDelete = useSelector((state) => state.reservationDelete);
  const { success: deleteSuccess } = reservationDelete;

  const reservationUpdate = useSelector((state) => state.reservationUpdate);
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = reservationUpdate;

  useEffect(() => {
    dispatch(listReservations(isHost));
  }, [dispatch, isHost, deleteSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      setIsEditing(false);
      dispatch({ type: RESERVATION_UPDATE_RESET });
      dispatch(listReservations(isHost));
    }
  }, [updateSuccess, dispatch, isHost]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this reservation?")) {
      dispatch(deleteReservation(id));
    }
  };

  const handleEditClick = (resv) => {
    setEditId(resv._id);
    const cIn = resv.checkin
      ? new Date(resv.checkin).toISOString().split("T")[0]
      : "";
    const cOut = resv.checkout
      ? new Date(resv.checkout).toISOString().split("T")[0]
      : "";
    setEditCheckin(cIn);
    setEditCheckout(cOut);
    setEditHotelName(resv.hotel_id?.name || resv.hotel_name || "Getaway");
    setIsEditing(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!editCheckin || !editCheckout) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(editCheckout) <= new Date(editCheckin)) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    dispatch(updateReservation(editId, editCheckin, editCheckout));
  };

  return (
    <div>
      <Admin_nav />
      <div className="reservations_page">
        <div className="reserv_tittle">
          <span>My Reservations</span>
        </div>

        {loading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <h3 className="listing_error">{error}</h3>
        ) : reservations.length === 0 ? (
          <p>No reservations found.</p>
        ) : (
          <table className="reservations_table">
            <thead>
              <tr>
                <th>Booked by</th>
                <th>Hotel Name</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.username || "-"}</td>
                  <td>
                    {reservation.hotel_id?.name ||
                      reservation.hotel_name ||
                      "-"}
                  </td>
                  <td>{formatDate(reservation.checkin)}</td>
                  <td>{formatDate(reservation.checkout)}</td>
                  <td>
                    <div className="action_buttons_container">
                      <button
                        className="edit_reservation_btn"
                        onClick={() => handleEditClick(reservation)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete_reservation_btn"
                        onClick={() => handleDelete(reservation._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isEditing && (
        <div className="modal_overlay">
          <div className="modal_content">
            <h2>Edit Reservation</h2>
            <h4>{editHotelName}</h4>
            {updateError && <p className="listing_error">{updateError}</p>}
            <form onSubmit={handleUpdateSubmit}>
              <div className="modal_form_group">
                <label>Check-in Date</label>
                <input
                  type="date"
                  value={editCheckin}
                  onChange={(e) => setEditCheckin(e.target.value)}
                  required
                />
              </div>
              <div className="modal_form_group">
                <label>Check-out Date</label>
                <input
                  type="date"
                  value={editCheckout}
                  onChange={(e) => setEditCheckout(e.target.value)}
                  min={
                    editCheckin
                      ? new Date(
                          new Date(editCheckin).getTime() + 24 * 60 * 60 * 1000,
                        )
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  required
                />
              </div>
              <div className="modal_actions">
                <button
                  type="submit"
                  className="modal_save_btn"
                  disabled={updateLoading}
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="modal_cancel_btn"
                  onClick={() => setIsEditing(false)}
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

export default Reservetion;
