import "./sort-and-filter.scss";

import FilterField from "../filter-field/filter-field";
import { categories } from "../../utils/menu-logic/categories";

const SortAndFilter = ({ categoryId, itemId }) => {

  return (
    <div className="filter-box">
      <h1>Placeholder Filter Box</h1>
      <span className="filter-header">Filter by</span>
      <div className="filter-fields-container">
        {
          // Do not show this filter field on Subtitles category page
          categoryId !== categories.subtitles && (
            <FilterField
              fieldName="subs"
              fieldDisplayName="Subs Languages"
              fieldPlaceholderText="Select subs language"
            />
          )
        }
        {
          // Do not show this filter field on Genre category page unless we're showing All Movies page
          (categoryId !== categories.genre || itemId === "all-movies") && (
            <FilterField
              fieldName="genre"
              fieldDisplayName="Categories"
              fieldPlaceholderText="Select category"
            />
          )
        }
        {
          // Do not show this filter field on Countries category page
          categoryId !== categories.country && (
            <FilterField
              fieldName="country"
              fieldDisplayName="Countries"
              fieldPlaceholderText="Select country"
            />
          )
        }
        {
          // Do not show this filter field on Decades category page
          categoryId !== categories.decade && (
            <FilterField
              fieldName="decade"
              fieldDisplayName="Decades"
              fieldPlaceholderText="Select decade"
            />
          )
        }
      </div>
    </div>
  );
};

export default SortAndFilter;
