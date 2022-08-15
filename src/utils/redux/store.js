import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter-slice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
})