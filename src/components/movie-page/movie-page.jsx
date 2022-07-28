// Take movie id as a path parameter, get the movie data from Firestore and render a movie page

import "./movie-page.scss";

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMovieFromDatabase } from "../../utils/firebase/firebase";
import { mapCodeToLanguage } from "../../utils/language-codes";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    const getMovieData = async () => {
      const movieData = await getMovieFromDatabase(id);
      setMovie(movieData);
    };

    getMovieData();
    // eslint-disable-next-line
  }, []);

  if (movie) {
    const callToAction = `Watch online ${movie.title} with ${movie.subs
      .map((langCode) => mapCodeToLanguage[langCode])
      .join(", ")} subtitles`;

    return (
      <div className="movie-page">
        <img
          className="movie-cover"
          src={movie.image}
          alt={movie.title + " cover image"}
        />

        <div className="content-column">
          <span className="movie-breadcrumbs">
            <Link to="/">Eastern European Movies</Link>&nbsp;&gt;{" "}
            <Link to={"/" + movie.genre[0].toLowerCase()}>
              {movie.genre[0]}
            </Link>
            &nbsp;&gt; {movie.title}
          </span>

          <span className="movie-year">{movie.year}</span>
          <h1 className="movie-title">{movie.title}</h1>

          <div className="original-title">
            <div className="original-title-text">Original Title</div>
            <div className="original-title-line"></div>
            <div className="original-title-text">{movie.originalTitle}</div>
          </div>

          <div className="movie-data-table">
            <div className="country">
              <span className="field-name">COUNTRY: </span>
              <span className="field-value">
                {typeof movie.country === "string" ? (
                  <Link
                    className="link"
                    to={"/country/" + movie.country.toLowerCase()}
                  >
                    {movie.country}
                  </Link>
                ) : (
                  movie.country.map((country, index) => (
                    <>
                      <Link
                        className="link"
                        key={index}
                        to={"/country/" + country.toLowerCase()}
                      >
                        {country}
                      </Link>{" "}
                    </>
                  ))
                )}
              </span>
            </div>
            <div className="imdb">
              <span className="field-name">IMDB: </span>
              <span className="field-value">{movie.imdbRating.toFixed(1)}</span>
            </div>
            <div className="views">
              <span className="field-name">VIEWS: {movie.views}</span>
            </div>
            <div className="subs">
              <span className="field-name">SUBS: </span>
              <span className="field-value">
                {movie.subs.sort().map((langCode, index) => (
                  <>
                    <Link
                      className="link"
                      key={index}
                      to={mapCodeToLanguage[langCode].toLowerCase()}
                    >
                      {langCode}
                    </Link>{" "}
                  </>
                ))}
              </span>
            </div>
          </div>

          <div className="movie-credits">
            <div className="credits-section">
              <div className="field-title">
                <span className="field-name">DIRECTOR</span>
              </div>
              <div className="field-values">
                {typeof movie.director === "string" ? (
                  <span className="field-value-credits">{movie.director}</span>
                ) : (
                  movie.director.map((director, index) => (
                    <span key={index} className="field-value-credits">
                      {director}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div className="credits-section">
              <div className="field-title">
                <span className="field-name">ACTORS</span>
              </div>
              <div className="field-values">
                {movie.actors.map((actor, index) => (
                  <span key={index} className="field-value-credits">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="movie-description">
            <span className="description">{movie.description}</span>
            <h2 className="call-to-action">{callToAction}</h2>
          </div>

        </div>
      </div>
    );
  } else if (movie === null) return <h2>Movie not found in the database!</h2>;
  else return null;
};

export default MoviePage;
