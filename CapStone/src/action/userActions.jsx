import axiosInstance from "../api/axiosInstance";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../types/userTypes";

const getErrorMessage = (error) =>
  error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message;

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axiosInstance.get("/user/login", {
      params: { username, password },
    });

    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: getErrorMessage(error) });
  }
};

export const register =
  (username, password, role) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const { data } = await axiosInstance.post("/user/signup", {
        username,
        password,
        role,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: getErrorMessage(error) });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
