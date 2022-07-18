// Take a movie object as a prop and render a movie card

import "./movie-card.scss";

const MovieCard = ({ movie }) => {
  return (
    <article className="movie-card">
      <img alt={movie.name + " image"} src={movie.image} />
      <p className="genres">{movie.genres.join(" / ")}</p>
      <h3>{movie.name}</h3>
      <p className="year">{movie.year}</p>
    </article>
  );
};

export default MovieCard;