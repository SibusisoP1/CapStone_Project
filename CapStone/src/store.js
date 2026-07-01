import { configureStore } from "@reduxjs/toolkit";
import { listingListReducer } from "./reducers/listingReducers";
import { userLoginReducer } from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    listingList: listingListReducer,
    userLogin: userLoginReducer,
  },
});
