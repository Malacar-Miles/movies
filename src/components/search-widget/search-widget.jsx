import "./search-widget.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";

const SearchWidget = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    setIsSearchBoxOpen(true);
  };

  const handleCloseButtonClick = (clickEvent) => {
    clickEvent.preventDefault();
    setIsSearchBoxOpen(false);
  };

  const handleSearchFieldChange = (changeEvent) => {
    setSearchQuery(changeEvent.target.value);
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const serializedSearchQuery = encodeURIComponent(searchQuery.trim());
    setIsSearchBoxOpen(false);
    navigate("/search/" + serializedSearchQuery);
    setSearchQuery("");
  };

  return (
    <div className="search-widget">
      <SearchIcon
        className="search-icon"
        onClick={handleSearchIconClick}
      />
      {isSearchBoxOpen && (
        <form className="search-widget-inner-content" onSubmit={handleSubmit}>
          <input
            className="search-field"
            name="search-field"
            type="search"
            placeholder="Search here..."
            required
            onChange={handleSearchFieldChange}
          />
          <button className="search-submit-button" type="submit">
            <SearchIcon className="search-button-icon" />
          </button>
          <button
            className="search-close-button"
            onClick={handleCloseButtonClick}
          >
            &#10006;
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchWidget;
