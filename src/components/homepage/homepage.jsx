// This is the content page that shows at the default path (<site_root>/index.html)

import "./homepage.scss";

import MovieList from "../movie-list/movie-list";

const HomePage = ({ movies }) => {
  return (
    <>
      <h1>Homepage placeholder</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default HomePage;