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

    addValueToField: (state, action) => {
      const { fieldName, newValue }: { fieldName: string; newValue: string } =
        action.payload;

      // Convert state to "filter" type so that we can access its fields with [filedName]
      const convertedState = state as Filter;

      // Get fieldCurrentValues
      const fieldCurrentValues =
        convertedState[fieldName as keyof Filter].fieldCurrentValues;

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
      const convertedState = state as Filter;

      // Get fieldCurrentValues
      const fieldCurrentValues =
        convertedState[fieldName as keyof Filter].fieldCurrentValues;

      // If the fieldCurrentValues array contains valueToRemove then update the filter
      if (fieldCurrentValues.includes(valueToRemove)) {
        convertedState[fieldName as keyof Filter].fieldCurrentValues =
          fieldCurrentValues.filter((value) => value !== valueToRemove);
      }
    },
  },
});

// Export selector functions to be used in components
export const selectFieldCurrentValues = (fieldName: string) => {
  return (state: RootState) =>
    state.filter[fieldName as keyof Filter].fieldCurrentValues;
};
export const selectFieldPossibleValues = (fieldName: string) => {
  return (state: RootState) =>
    state.filter[fieldName as keyof Filter].fieldPossibleValues;
};
export const selectCurrentFilter = () => {
  return (state: RootState) => state.filter;
};

export const { resetFilter, addValueToField, removeValueFromField } =
  filterSlice.actions;
export default filterSlice.reducer;
