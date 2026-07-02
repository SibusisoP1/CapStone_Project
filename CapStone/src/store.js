import { configureStore } from "@reduxjs/toolkit";
import {
  listingListReducer,
  listingCreateReducer,
  listingDeleteReducer,
} from "./reducers/listingReducers";
import { userLoginReducer } from "./reducers/userReducer";
import {
  reservationListReducer,
  reservationCreateReducer,
  reservationDeleteReducer,
} from "./reducers/reservationReducers";

export const store = configureStore({
  reducer: {
    listingList: listingListReducer,
    listingCreate: listingCreateReducer,
    listingDelete: listingDeleteReducer,
    userLogin: userLoginReducer,
    reservationList: reservationListReducer,
    reservationCreate: reservationCreateReducer,
    reservationDelete: reservationDeleteReducer,
  },
});
