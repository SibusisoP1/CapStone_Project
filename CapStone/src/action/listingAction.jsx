import {
  LISTING_LIST_REQUEST,
  LISTING_LIST_SUCCESS,
  LISTING_LIST_FAIL,
  LISTING_CREATE_REQUEST,
  LISTING_CREATE_SUCCESS,
  LISTING_CREATE_FAIL,
  LISTING_UPDATE_REQUEST,
  LISTING_UPDATE_SUCCESS,
  LISTING_UPDATE_FAIL,
  LISTING_DELETE_REQUEST,
  LISTING_DELETE_SUCCESS,
  LISTING_DELETE_FAIL,
} from "../types/listingTypes";
import axiosInstance from "../api/axiosInstance";

const getErrorMessage = (error) =>
  error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;

export const listListing = () => async (dispatch) => {
  try {
    dispatch({ type: LISTING_LIST_REQUEST });

    const { data } = await axiosInstance.get("/hotel/hotels");

    dispatch({ type: LISTING_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LISTING_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

export const createListing = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LISTING_CREATE_REQUEST });

    const { data } = await axiosInstance.post("/hotel/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: LISTING_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LISTING_CREATE_FAIL, payload: getErrorMessage(error) });
  }
};

export const updateListing = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: LISTING_UPDATE_REQUEST });

    const { data } = await axiosInstance.put(`/hotel/hotels/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: LISTING_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LISTING_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
};

export const deleteListing = (id) => async (dispatch) => {
  try {
    dispatch({ type: LISTING_DELETE_REQUEST });

    await axiosInstance.delete(`/hotel/hotels/${id}`);

    dispatch({ type: LISTING_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: LISTING_DELETE_FAIL, payload: getErrorMessage(error) });
  }
};
