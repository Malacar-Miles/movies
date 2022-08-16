// This is a hashtable that maps displayed strings to internal field names
export const sortFields = { Year: "year", IMDB: "imdbRating", Views: "views" };

// Take an array of movies and return a sorted array
// This function mutates the original array, which should be OK
export const sortMovieList = (movies, sortType) =>
  movies.sort((movie1, movie2) => {
    const value1 = Number(movie1[sortType]);
    const value2 = Number(movie2[sortType]);
    return value2 - value1;
  });
