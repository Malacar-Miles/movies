// Take a movie object as a prop and render a movie card

import "./movie-card.scss";

import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <article className="movie-card">
      <p className="subs">SUBS / {movie.subs.join(" / ")}</p>

      <Link to={"/movie/" + movie.id}>
        <div className="image-container">
          <div className="hover-content">
            <div className="fields-container">
              <p className="field-name">COUNTRY:</p>
              <p className="field-value">
                {typeof movie.country === "string"
                  ? movie.country
                  : movie.country.join(" / ")}
              </p>

              <p className="field-name">ORIGINAL TITLE:</p>
              <p className="field-value">{movie.originalTitle}</p>

              <p className="field-name">LANGUAGE:</p>
              <p className="field-value">{movie.language}</p>

              <p className="field-name">IMDB RATING:</p>
              <p className="field-value">{movie.imdbRating.toFixed(1)}</p>

              <p className="field-name">VIEWS:</p>
              <p className="field-value">{movie.views}</p>
            </div>
          </div>

          <img
            className="movie-image"
            alt={movie.title + " cover image"}
            src={movie.image}
          />
        </div>
      </Link>

      <p className="genres">{movie.genre.join(" / ")}</p>
      <h3 className="title">
        <Link to={"/movie/" + movie.id}>{movie.title}</Link>
      </h3>
      <p className="year">{movie.year}</p>
    </article>
  );
};

export default MovieCard;