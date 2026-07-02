import {
  RESERVATION_LIST_REQUEST,
  RESERVATION_LIST_SUCCESS,
  RESERVATION_LIST_FAIL,
  RESERVATION_CREATE_REQUEST,
  RESERVATION_CREATE_SUCCESS,
  RESERVATION_CREATE_FAIL,
  RESERVATION_DELETE_REQUEST,
  RESERVATION_DELETE_SUCCESS,
  RESERVATION_DELETE_FAIL,
} from "../types/reservationTypes";
import axiosInstance from "../api/axiosInstance";

const getErrorMessage = (error) =>
  error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;

// admin = true fetches every reservation, otherwise only the logged-in user's.
export const listReservations =
  (admin = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: RESERVATION_LIST_REQUEST });

      const url = admin
        ? "/reservation/AllReservations"
        : "/reservation/reservations";
      const { data } = await axiosInstance.get(url);

      dispatch({ type: RESERVATION_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: RESERVATION_LIST_FAIL,
        payload: getErrorMessage(error),
      });
    }
  };

export const createReservation = (reservation) => async (dispatch) => {
  try {
    dispatch({ type: RESERVATION_CREATE_REQUEST });

    const { data } = await axiosInstance.post(
      "/reservation/create",
      reservation,
    );

    dispatch({ type: RESERVATION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RESERVATION_CREATE_FAIL,
      payload: getErrorMessage(error),
    });
  }
};

export const deleteReservation = (id) => async (dispatch) => {
  try {
    dispatch({ type: RESERVATION_DELETE_REQUEST });

    await axiosInstance.delete(`/reservation/reservations/${id}`);

    dispatch({ type: RESERVATION_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: RESERVATION_DELETE_FAIL,
      payload: getErrorMessage(error),
    });
  }
};
