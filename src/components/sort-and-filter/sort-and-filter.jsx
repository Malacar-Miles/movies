import "./sort-and-filter.scss";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import FilterField from "../filter-field/filter-field";
import { categories } from "../../utils/menu-logic/categories";
import { resetFilter } from "../../utils/redux/filter-slice";
import { sortFields } from "../../utils/menu-logic/sort";
import {
  selectCurrentSortState,
  setSortField,
} from "../../utils/redux/sort-slice";
import { useDetectMobileScreenSize } from "../../hooks/detect-mobile-screen-size";

const SortAndFilter = ({ categoryId, itemId }) => {
  const isMobileModeEnabled = useDetectMobileScreenSize();
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);

  const sortState = useSelector(selectCurrentSortState());

  const dispatch = useDispatch();
  const handleResetButtonClick = () => {
    dispatch(resetFilter());
  };

  const handleFilterHeaderClick = () => {
    setIsFilterBoxOpen(!isFilterBoxOpen);
  };

  return (
    <>
      {isMobileModeEnabled() && (
        <div className="sort-and-filter-header">
          <span
            className="toggle"
            onClick={handleFilterHeaderClick}
            aria-label="Show or hide filter"
          >
            Filters
            {isFilterBoxOpen ? (
              <span className="arrow-down"></span>
            ) : (
              <span className="arrow-up"></span>
            )}
          </span>
        </div>
      )}
      {
        // Show filter box if either mobile mode is disabled or filter box state is open
        (!isMobileModeEnabled() || isFilterBoxOpen) && (
          <div className="sort-and-filter">
            <div className="sort-box">
              <span className="sort-header">Sort by</span>
              <div className="sort-fields-container">
                {Object.keys(sortFields).map((field, index) => (
                  <div
                    key={index}
                    className={
                      sortFields[field] === sortState
                        ? "sort-field selected"
                        : "sort-field"
                    }
                    onClick={() => dispatch(setSortField(sortFields[field]))}
                  >
                    {field}
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-box">
              <span className="filter-header">Filter by</span>
              <div
                className={
                  isMobileModeEnabled()
                    ? "filter-fields-container mobile-mode"
                    : "filter-fields-container"
                }
              >
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
                  (categoryId !== categories.genre ||
                    itemId === "all-movies") && (
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
                {!isMobileModeEnabled() && (
                  <button
                    className="reset-button"
                    onClick={handleResetButtonClick}
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default SortAndFilter;
