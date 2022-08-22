import "./search-bar.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";

const SearchBar = ({ setIsOpen, mobileMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchFieldChange = (changeEvent) => {
    setSearchQuery(changeEvent.target.value);
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const serializedSearchQuery = encodeURIComponent(searchQuery.trim());
    navigate("/search/" + serializedSearchQuery);
    setSearchQuery("");
    // If setIsSearchBoxOpen has been passed as a prop, use it to close the popup
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <form
      className={
        mobileMode ? "search-bar-assembly mobile-mode" : "search-bar-assembly"
      }
      onSubmit={handleSubmit}
    >
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
    </form>
  );
};

export default SearchBar;
