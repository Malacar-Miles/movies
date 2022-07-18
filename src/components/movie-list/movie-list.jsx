// Take an array of movie objects and render it as a list of MovieCard items

import "./movie-list.scss";
import MovieCard from "../movie-card/movie-card";

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
