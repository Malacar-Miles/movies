import "./search-bar.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";

const SearchBar = ({
  setIsPopupOpen,
  mobileMode,
}: {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMode?: boolean;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchFieldChange = (
    changeEvent: React.FormEvent<HTMLInputElement>
  ) => {
    setSearchQuery((changeEvent.target as HTMLInputElement).value);
  };

  const handleSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    const serializedSearchQuery = encodeURIComponent(searchQuery.trim());
    navigate("/search/" + serializedSearchQuery);
    setSearchQuery("");
    // If setIsPopupOpen has been passed as a prop, use it to close the popup
    if (setIsPopupOpen) setIsPopupOpen(false);
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
