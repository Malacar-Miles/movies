import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter-slice";
import sortReducer from "./sort-slice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer
  },
})