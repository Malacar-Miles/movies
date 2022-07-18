import './App.css';

import MainHeader from "./components/main-header/main-header.jsx";
import { moviesJSON } from "./utils/firebase/movies-json.js";
import { useEffect, useState } from "react";
import { addMovieToDatabase, getAllMoviesFromDatabase } from './utils/firebase/firebase';
import MovieList from './components/movie-list/movie-list';

function App() {
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    // Upload JSON movies data to Firestore database. Uncomment to execute
    // moviesJSON.forEach((movie) => addMovieToDatabase(movie));

    const getAllMovies = async () => {
      const allMovies = await getAllMoviesFromDatabase();
      setMovies(allMovies);
    };

    getAllMovies();

  }, []);

  return (
    <div className="app">
      <MainHeader />
      <br />
      <MovieList movies={movies.slice(0, 12)} />
    </div>
  );
}

export default App;
