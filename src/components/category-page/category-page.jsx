// Render a movie category page with a custom movie list
// Take categoryId and movieId as path parameters and render the page based on their values

import "./category-page.scss";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { mapIdToGenre } from "../../utils/menu-logic/genres";
import { mapCountryNounToAdjective } from "../../utils/menu-logic/countries";
import { mapLanguageToCode } from "../../utils/menu-logic/language-codes";
import { decadeBoundaries } from "../../utils/menu-logic/decades";
import { toTitleCase } from "../../utils/menu-logic/helper-functions";
import { categories } from "../../utils/menu-logic/categories";
import { emptyFilter } from "../../utils/menu-logic/filter";
import { getAllMoviesFromDatabase, getMoviesByCategoryFromDatabase } from "../../utils/firebase/firebase";
import PageNotFound from "../page-not-found/page-not-found";
import MovieList from "../movie-list/movie-list";
import SortAndFilter from "../sort-and-filter/sort-and-filter";

const CategoryPage = () => {
  const { categoryId, itemId } = useParams();
  const [ movies, setMovies ] = useState([]);
  const [ filter, setFilter ] = useState({});
  let categoryPageTitle, categoryPageSubtitle;

  useEffect(() => {
    // Reset the filter
    setFilter(emptyFilter);
    
    // Get a filtered movie list from the database
    const getMovies = async () => {
      if (categoryId === categories.genre && itemId === "all-movies")
        setMovies(await getAllMoviesFromDatabase());
      else 
        setMovies(await getMoviesByCategoryFromDatabase(categoryId, itemId));
    };
    getMovies();

    // eslint-disable-next-line
  }, [categoryId, itemId]);

  // Generate a page title (and in some cases a subtitle) based on categoryId and itemId
  switch (categoryId) {
    case categories.genre:
      // If itemId is found in the list of supported genres then assign a value to categoryPageTitle, otherwise assign null
      categoryPageTitle = mapIdToGenre[itemId] || null;
      categoryPageSubtitle = "Eastern European";
      if (itemId === "all-movies") {
        categoryPageTitle = "Eastern European Movies";
        categoryPageSubtitle = "All"
      }
      break;
    case categories.country:
      // If itemId is found in the list of supported countries then assign a value to categoryPageTitle, otherwise assign null
      categoryPageTitle =
        mapCountryNounToAdjective[toTitleCase(itemId)] || null;
      if (categoryPageTitle) categoryPageTitle += " Movies";
      break;
    case categories.subtitles:
      const country = toTitleCase(itemId);
      // If itemId is found in the list of supported countries then assign a value to categoryPageTitle, otherwise assign null
      categoryPageTitle =
        (mapLanguageToCode[country] && country + " Subtitles") || null;
      break;
    case categories.decade:
      // If itemId is a valid decade then assign a value to categoryPageTitle, otherwise assign null
      categoryPageTitle =
        (decadeBoundaries(itemId) && itemId + "'s Movies") || null;
      break;
    default:
      categoryPageTitle = null;
  }
  
  // Only render the page if categoryPageTitle is truthy. Otherwise render the 404 page
  if (categoryPageTitle)
    return (
      <div className="category-page">
        <h1 className="category-title">
          {categoryPageSubtitle && (
            <span className="category-subtitle">{categoryPageSubtitle}</span>
          )}
          {categoryPageTitle}
        </h1>
        <SortAndFilter
          categoryId={categoryId}
          itemId={itemId}
          filter={filter}
          setFilter={setFilter}
        />
        <MovieList movies={movies} />
      </div>
    );
  else return <PageNotFound />;
};

export default CategoryPage;
