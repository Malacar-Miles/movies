import './App.css';

import MainHeader from "./components/main-header/main-header.jsx";
import { useEffect, useState } from "react";
import { getAllMoviesFromDatabase } from './utils/firebase/firebase';
import MovieList from './components/movie-list/movie-list';
import UploadDataButton from './components/upload-data-button/upload-data-button';

function App() {
  const [ movies, setMovies ] = useState([]);

  useEffect(() => {
    const getAllMovies = async () => {
      const allMovies = await getAllMoviesFromDatabase();
      setMovies(allMovies);
    };

    getAllMovies();
  }, []);

  return (
    <div className="app">
      <MainHeader />
      <MovieList movies={movies} />
      {/* <UploadDataButton /> */}
    </div>
  );
}

export default App;
