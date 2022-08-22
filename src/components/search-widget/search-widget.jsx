import "./search-widget.scss";

import { useState } from "react";

import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
import SearchBar from "../search-bar/search-bar";

const SearchWidget = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);

  const handleSearchIconClick = () => {
    setIsSearchBoxOpen(true);
  };

  const handleCloseButtonClick = (clickEvent) => {
    clickEvent.preventDefault();
    setIsSearchBoxOpen(false);
  };

  return (
    <div className="search-widget">
      <SearchIcon className="search-icon" onClick={handleSearchIconClick} />
      {isSearchBoxOpen && (
        <div className="search-widget-popup">
          <SearchBar setIsOpen={setIsSearchBoxOpen} />      
          <button
            className="search-close-button"
            onClick={handleCloseButtonClick}
          >
            &#10006;
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchWidget;
