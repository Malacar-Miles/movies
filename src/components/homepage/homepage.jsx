// This is the content page that shows at the default path (<site_root>/index.html)

import "./homepage.scss";

import { useState, useEffect } from "react";

import MovieList from "../movie-list/movie-list";
import DecorativeElement from "../decorative-element/decorative-element";
import { getAllMoviesFromDatabase } from "../../utils/firebase/firebase";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getAllMovies = async () => {
      const allMovies = await getAllMoviesFromDatabase();
      setMovies(allMovies);
    };

    getAllMovies();
  }, []);

  return (
    <div className="homepage">
      <DecorativeElement decoratorType="homepage-decorator" />
      <div className="intro-text">
        <p>
          This site is a partial clone of a commercial movie streaming site{" "}
          <a href="https://easterneuropeanmovies.com/">
            easterneuropeanmovies.com
          </a>
          . I've made it as a student portfolio project and I don't intend to
          monetize it in any way. If you are the owner of the original site and
          you want me to remove your brand elements or take down the site
          entirely, please contact me at{" "}
          <em>dsidelkovsky&nbsp;(at)&nbsp;gmail.com</em>.
        </p>
        <p>
          It's not a 100% faithful copy of the original&nbsp;&mdash; the fonts,
          layouts and animations might differ slightly. My main focus was to
          reproduce the app's interactive features, such as the navigation
          menus, filters, search, responsive design, etc.
        </p>
        <p>
          This site was made with React framework. It uses Google Firestore
          database to host movie data, and it gets movie cover images from the
          original site. The database only stores {movies.length + " "}
          movie documents, but it should be enough to demonstrate the
          functionality.
        </p>
        <p>
          I didn't read or copy any of the JavaScript code from the original
          site, although I did check some of its CSS (colors, font sizes, etc.)
          for reference.
        </p>
      </div>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
