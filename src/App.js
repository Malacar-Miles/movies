import './App.css';

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import MainHeader from "./components/main-header/main-header.jsx";
import { getAllMoviesFromDatabase } from './utils/firebase/firebase';
import HomePage from './components/homepage/homepage';
import MoviePage from './components/movie-page/movie-page';
// import UploadDataButton from './components/upload-data-button/upload-data-button';

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
      <Routes>
        <Route path="/" element={<MainHeader />}>
          <Route index element={<HomePage movies={movies} />} />
          <Route path="movie/*">
            <Route path=":id" element={<MoviePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
