import { useSelector } from "react-redux";

import "./movie-list.scss";
import MovieCard from "../movie-card/movie-card";
import { filterMovieList } from "../../utils/menu-logic/filter";
import { sortMovieList } from "../../utils/menu-logic/sort";
import { selectCurrentSortState } from "../../utils/redux/sort-slice";
import { selectCurrentFilter } from "../../utils/redux/filter-slice";


// Take an array of movie objects and render it as a list of MovieCard items
const MovieList = ({ movies, enableFilter }) => {
  // Get all filter field values from Redux
  const allFilterFieldValues = useSelector(selectCurrentFilter());
  const sortState = useSelector(selectCurrentSortState());

  // If the filter is enabled, filter the movie list
  if (enableFilter) {
    movies = filterMovieList(movies, allFilterFieldValues);
    movies = sortMovieList(movies, sortState);
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
