import { createSlice } from "@reduxjs/toolkit";
import { emptyFilter } from "../menu-logic/filter";
import { filter } from "../menu-logic/filter";
import { rootState } from "./store";

const initialState = emptyFilter;

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilter: () => {
      return emptyFilter;
    },

    addValueToField: (state, action) => {
      const { fieldName, newValue }: { fieldName: string; newValue: string } =
        action.payload;

      // Convert state to "filter" type so that we can access its fields with [filedName]
      const convertedState = state as filter;

      // Get fieldCurrentValues
      const fieldCurrentValues =
        convertedState[fieldName as keyof filter].fieldCurrentValues;

      // If the fieldCurrentValues array doesn't yet contain newValue then update the filter
      if (!fieldCurrentValues.includes(newValue)) {
        fieldCurrentValues.push(newValue);
      }
    },

    removeValueFromField: (state, action) => {
      const {
        fieldName,
        valueToRemove,
      }: { fieldName: string; valueToRemove: string } = action.payload;

      // Convert state to filter type so that we can access its fields with [filedName]
      const convertedState = state as filter;

      // Get fieldCurrentValues
      const fieldCurrentValues =
        convertedState[fieldName as keyof filter].fieldCurrentValues;

      // If the fieldCurrentValues array contains valueToRemove then update the filter
      if (fieldCurrentValues.includes(valueToRemove)) {
        convertedState[fieldName as keyof filter].fieldCurrentValues =
          fieldCurrentValues.filter((value) => value !== valueToRemove);
      }
    },
  },
});

// Export selector functions to be used in components
export const selectFieldCurrentValues = (fieldName: string) => {
  return (state: rootState) =>
    state.filter[fieldName as keyof filter].fieldCurrentValues;
};
export const selectFieldPossibleValues = (fieldName: string) => {
  return (state: rootState) =>
    state.filter[fieldName as keyof filter].fieldPossibleValues;
};
export const selectCurrentFilter = () => {
  return (state: rootState) => state.filter;
};

export const { resetFilter, addValueToField, removeValueFromField } =
  filterSlice.actions;
export default filterSlice.reducer;
