import { mapLanguageToCode } from "./language-codes";
import { mapGenreToId } from "./genres";
import { mapCountryNounToAdjective } from "./countries";
import { allDecadesArray } from "./decades";

class filterField {
  constructor(possibleValues) {
    this.fieldPossibleValues = possibleValues;
    this.fieldCurrentValues = [];
  }
}

// Create an object that will serve as an empty filter
const emptyFilterWithTypes = {
  subs: new filterField(Object.keys(mapLanguageToCode)),
  genre: new filterField(Object.keys(mapGenreToId)),
  country: new filterField(Object.keys(mapCountryNounToAdjective)),
  decade: new filterField(allDecadesArray),
  // I've decided to not implement filtering by directors and actors for now
  // director: new filterField([]),
  // actors: new filterField([]),
};
// Turn this object into a generic JavaScript object to avoid "non-serializable data" error in Redux
export const emptyFilter = JSON.parse(JSON.stringify(emptyFilterWithTypes));

// Take an array of movies and return a filtered array based on filter field values from Redux
export const filterMovieList = (movies, filter) =>
  movies.filter((movie) => {
    // Make a check for each filter field
    for (const filterField in filter) {
      let values = filter[filterField].fieldCurrentValues;
      // Only do the check if the values array has at least one value
      if (values.length !== 0) {
        let filterMatchFound = false;
        // Implement separate checking logic depending on whether the movie object
        // has a field with the same name as the filter field
        if (movie[filterField]) {
          if (filterField === "subs") {
            // Subtitles are stored as two-letter codes in the movie object,
            // but they are stored as language strings in the filter.
            // Therefore we need to convert the filter values to codes.
            values = values.map((value) => mapLanguageToCode[value]);
          }
          // Check if any of the values in the filter field array is contained
          // in the corresponding array of the movie object
          values.forEach((value) => {
            if (movie[filterField].includes(value)) filterMatchFound = true;
          });
        } else if (filterField === "decade") {
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
