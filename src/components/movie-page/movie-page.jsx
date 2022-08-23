// Take movie id as a path parameter, get the movie data from Firestore and render a movie page

import "./movie-page.scss";

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMovieFromDatabase } from "../../utils/firebase/firebase";
import { mapCodeToLanguage } from "../../utils/menu-logic/language-codes";
import { categories } from "../../utils/menu-logic/categories";
import PageNotFound from "../page-not-found/page-not-found";
import DecorativeElement from "../decorative-element/decorative-element";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    const getMovieData = async () => {
      const movieData = await getMovieFromDatabase(movieId);
      setMovie(movieData);
    };

    getMovieData();
    // eslint-disable-next-line
  }, []);

  if (movie) {
    const genericDescription = `${movie.title} with ${movie.subs
      .map((langCode) => mapCodeToLanguage[langCode])
      .join(", ")} subtitles`;

    return (
      <div className="movie-page">
        <DecorativeElement decoratorType="movie-page-decorator" />
        <img
          className="movie-cover"
          src={movie.image}
          alt={movie.title + " cover image"}
        />

        <div className="content-column">
          <span className="movie-breadcrumbs">
            <Link to="/">Eastern European Movies</Link>&nbsp;&gt;{" "}
            <Link to={`/${categories.genre}/${movie.genre[0].toLowerCase()}`}>
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
                {movie.country.map((country, index) => (
                  <>
                    <Link
                      className="link"
                      key={index}
                      to={`/${categories.country}/${country.toLowerCase()}`}
                    >
                      {country}
                    </Link>{" "}
                  </>
                ))}
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
                      to={`/${categories.subtitles}/${mapCodeToLanguage[langCode].toLowerCase()}`}
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
                {movie.director.map((director, index) => (
                  <span key={index} className="field-value-credits">
                    {director}
                  </span>
                ))}
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
            <span className="description">
              {genericDescription + " " + movie.description}
            </span>
            <h2 className="call-to-action">
              {"Watch Online " + genericDescription}
            </h2>
          </div>
        </div>
      </div>
    );
  } else if (movie === null) return <PageNotFound />;
  else return null; // This should trigger if movie is undefined
};

export default MoviePage;
