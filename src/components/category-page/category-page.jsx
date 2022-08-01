// Render a movie category page with a custom movie list
// Take categoryId and movieId as path parameters and render the page based on their values

import "./category-page.scss";

import { useParams } from "react-router-dom";

import { mapIdToGenre } from "../../utils/menu-logic/genres";
import { mapCountryNounToAdjective } from "../../utils/menu-logic/countries";
import { toTitleCase } from "../../utils/menu-logic/helper-functions";
import PageNotFound from "../page-not-found/page-not-found";


const CategoryPage = () => {
  const { categoryId, itemId } = useParams();

  // Generate a page title (and in some cases a subtitle) based on categoryId and itemId
  let categoryPageTitle, categoryPageSubtitle;
  switch (categoryId) {
    case "genre":
      categoryPageTitle = mapIdToGenre[itemId];
      categoryPageSubtitle = "Eastern European";
      break;
    case "country":
      categoryPageTitle = mapCountryNounToAdjective[toTitleCase(itemId)];
      if (categoryPageTitle) categoryPageTitle += " Movies";
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
        <p>categoryId: <em>{categoryId}</em></p>
        <p>itemId: <em>{itemId}</em></p>
      </div>
    );
  else return <PageNotFound />;
};

export default CategoryPage;
