import { configureStore } from "@reduxjs/toolkit";
import {
  listingListReducer,
  listingCreateReducer,
  listingUpdateReducer,
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
    listingUpdate: listingUpdateReducer,
    listingDelete: listingDeleteReducer,
    userLogin: userLoginReducer,
    reservationList: reservationListReducer,
    reservationCreate: reservationCreateReducer,
    reservationDelete: reservationDeleteReducer,
  },
});
