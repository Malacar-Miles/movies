import './App.css';

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import MainHeader from "./components/main-header/main-header.jsx";
import { getAllMoviesFromDatabase } from './utils/firebase/firebase';
import HomePage from './components/homepage/homepage';
import MoviePage from './components/movie-page/movie-page';
import CategoryPage from './components/category-page/category-page';
import PageNotFound from './components/page-not-found/page-not-found';
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
          <Route path="movie/:movieId" element={<MoviePage />} />
          <Route path=":categoryId/:itemId" element={<CategoryPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
