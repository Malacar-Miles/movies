import { createSlice } from "@reduxjs/toolkit";
import { sortFields } from "../menu-logic/sort";

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
  return ((state) => state.sort);
};

export const { setSortField } = sortSlice.actions;
export default sortSlice.reducer;