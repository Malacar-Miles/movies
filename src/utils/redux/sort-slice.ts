import { createSlice } from "@reduxjs/toolkit";
import { sortFields } from "../menu-logic/sort";
import { RootState } from "./store";

const initialState = sortFields.Year;

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortField: (state, action) => {
      return action.payload;
    }
  }
});

// Export selector function to be used in components
export const selectCurrentSortState = () => {
  return ((state: RootState) => state.sort);
};

export const { setSortField } = sortSlice.actions;
export default sortSlice.reducer;