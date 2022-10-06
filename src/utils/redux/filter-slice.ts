import { createSlice } from "@reduxjs/toolkit";
import { emptyFilter } from "../menu-logic/filter";
import { Filter } from "../menu-logic/filter";
import { RootState } from "./store";

const initialState = emptyFilter;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilter: () => {
      return emptyFilter;
    },

    addValueToField: (state: Filter, action) => {
      const { fieldName, newValue }: { fieldName: keyof Filter; newValue: number | string } =
        action.payload;


      // Get fieldCurrentValues
      const fieldCurrentValues = state[fieldName].fieldCurrentValues;

      // If the fieldCurrentValues array doesn't yet contain newValue then update the filter
      if (!fieldCurrentValues.includes(newValue)) {
        fieldCurrentValues.push(newValue);
      }
    },

    removeValueFromField: (state: Filter, action) => {
      const {
        fieldName,
        valueToRemove,
      }: { fieldName: keyof Filter; valueToRemove: number | string } = action.payload;

      // Get fieldCurrentValues
      const fieldCurrentValues = state[fieldName].fieldCurrentValues;

      // If the fieldCurrentValues array contains valueToRemove then update the filter
      if (fieldCurrentValues.includes(valueToRemove)) {
        state[fieldName].fieldCurrentValues = fieldCurrentValues.filter(
          (value) => value !== valueToRemove
        );
      }
    },
  },
});

// Export selector functions to be used in components
export const selectFieldCurrentValues = (fieldName: keyof Filter) => {
  return (state: RootState) =>
    state.filter[fieldName].fieldCurrentValues;
};
export const selectFieldPossibleValues = (fieldName: keyof Filter) => {
  return (state: RootState) =>
    state.filter[fieldName].fieldPossibleValues;
};
export const selectCurrentFilter = () => {
  return (state: RootState) => state.filter;
};

export const { resetFilter, addValueToField, removeValueFromField } =
  filterSlice.actions;
export default filterSlice.reducer;
