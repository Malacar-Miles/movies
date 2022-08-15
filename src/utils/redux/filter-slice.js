import { createSlice } from "@reduxjs/toolkit";

import { emptyFilter } from "../menu-logic/filter";

const initialState = emptyFilter;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilter: () => {
      return emptyFilter;
    },

    addValueToField: (state, action) => {
      const { fieldName, newValue } = action.payload;
      // If the fieldCurrentValues array doesn't yet contain newValue then update the filter
      if (!state[fieldName].fieldCurrentValues.includes(newValue)) {
        state[fieldName].fieldCurrentValues.push(newValue);
      }
    },

    removeValueFromField: (state, action) => {
      const { fieldName, valueToRemove } = action.payload;
      // If the fieldCurrentValues array contains valueToRemove then update the filter
      if (state[fieldName].fieldCurrentValues.includes(valueToRemove)) {
        state[fieldName].fieldCurrentValues = state[
          fieldName
        ].fieldCurrentValues.filter((value) => value !== valueToRemove);
      }
    }
  }
});

// Export selector functions to be used in components
export const selectFieldCurrentValues = (fieldName) => {
  return ((state) => state.filter[fieldName].fieldCurrentValues);
};
export const selectFieldPossibleValues = (fieldName) => {
  return ((state) => state.filter[fieldName].fieldPossibleValues);
};

export const { resetFilter, addValueToField, removeValueFromField } = filterSlice.actions;
export default filterSlice.reducer;