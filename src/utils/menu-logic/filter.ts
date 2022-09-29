import { mapLanguageToCode } from "./language-codes";
import { mapGenreToId } from "./genres";
import { mapCountryNounToAdjective } from "./countries";
import { allDecadesArray } from "./decades";
import { movie } from "../types/types";

type numberOrString = number | string;
type filterField = {
  fieldPossibleValues: numberOrString[];
  fieldCurrentValues: numberOrString[];
};
type filter = {
  subs: filterField;
  genre: filterField;
  country: filterField;
  decade: filterField;
};

// Create a filter field
const createFilterField = (
  fieldPossibleValues: numberOrString[]
): filterField => {
  return { fieldPossibleValues: fieldPossibleValues, fieldCurrentValues: [] };
};

// Create an object that will serve as an empty filter
export const emptyFilter: filter = {
  subs: createFilterField(Object.keys(mapLanguageToCode)),
  genre: createFilterField(Object.keys(mapGenreToId)),
  country: createFilterField(Object.keys(mapCountryNounToAdjective)),
  decade: createFilterField(allDecadesArray),
};

// Take an array of movies and return a filtered array
// based on filter field values specified in the "filter" argument
export const filterMovieList = (movies: movie[], filter: filter) =>
  movies.filter((movie) => {
    // Make a check for each filter field
    for (const [filterFieldName, filterFieldValuesObject] of Object.entries(
      filter
    )) {
      let values = filterFieldValuesObject.fieldCurrentValues;
      // Only do the check if the values array has at least one value
      if (values.length !== 0) {
        let filterMatchFound = false;
        // Implement separate checking logic depending on whether the movie object
        // has a field with the same name as the filter field
        if (Object.keys(movie).includes(filterFieldName)) {
          // Subtitles are stored as two-letter codes in the movie object,
          // but they are stored as language strings in the filter.
          // Therefore we need to convert the filter values to codes.
          if (filterFieldName === "subs") {
            values = values.map((value) => mapLanguageToCode[value]);
          }
          // Check if any of the values in the filter field array is contained
          // in the corresponding array of the movie object
          values.forEach((value) => {
            if (
              (movie[filterFieldName as keyof movie] as numberOrString[]).includes(
                value
              )
            )
              filterMatchFound = true;
          });
        } else if (filterFieldName === "decade") {
          // Do the same check as above but evaluate the year instead of comparing arrays
          values.forEach((value) => {
            // In this case, value should be the decade, e.g. 1980
            value = Number(value);
            const year = Number(movie.year);
            if (year >= value && year <= value + 10) {
              filterMatchFound = true;
            }
          });
        }
        if (!filterMatchFound) return false;
      }
    }
    // If none of the above conditions triggered a "return false"
    return true;
  });
