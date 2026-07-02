import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Admin_nav from "../components/Admin_nav";
import "../style/Admin.css";
import {
  listReservations,
  deleteReservation,
} from "../action/reservationAction";

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
};

const Reservetion = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const isHost = userInfo?.user?.role === "host";

  const reservationList = useSelector((state) => state.reservationList);
  const { loading, error, reservations } = reservationList;

  const reservationDelete = useSelector((state) => state.reservationDelete);
  const { success: deleteSuccess } = reservationDelete;

  useEffect(() => {
    dispatch(listReservations(isHost));
  }, [dispatch, isHost, deleteSuccess]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this reservation?")) {
      dispatch(deleteReservation(id));
    }
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
                    <button
                      className="delete_reservation_btn"
                      onClick={() => handleDelete(reservation._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reservetion;
