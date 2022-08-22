// This is a mobile version of the main menu. It displays a menu icon.
// Upon clicking the icon, a full-screen popup window appears.
// The popup window is populated with nav menu items and a search bar.

// I've decided to copy/paste all my menu logic here rather than add it
// to the original MainMenu component with conditional statements for mobile mode
// because I think it will make the code easier to read.

import "./mobile-main-menu.scss";

import { useState } from "react";
import SearchBar from "../search-bar/search-bar";
import MobileMainMenuItem from "../mobile-main-menu-item/mobile-main-menu-item";
import MainMenuSubItem from "../main-menu-sub-item/main-menu-sub-item";
import { mapGenreToId } from "../../utils/menu-logic/genres";
import { mapCountryNounToAdjective } from "../../utils/menu-logic/countries";
import { allDecadesArray } from "../../utils/menu-logic/decades";
import { mapLanguageToCode } from "../../utils/menu-logic/language-codes";

const MobileMainMenu = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMobileMenuClick = () => {
    setIsPopupOpen(true);
  };

  const handleCloseButtonClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="mobile-main-menu">
      <div
        className="three-dashes-icon"
        onClick={handleMobileMenuClick}
        aria-label="Open navigation menu"
      >
        <div className="dash"></div>
        <div className="dash"></div>
        <div className="dash"></div>
      </div>
      {isPopupOpen && (
        <div className="fullscreen-popup-window">
          <button
            className="popup-close-button"
            onClick={handleCloseButtonClick}
            aria-label="Close menu"
          >
            &#10006;
          </button>
          <div className="popup-content">
            <SearchBar setIsOpen={setIsPopupOpen} mobileMode />

            <MobileMainMenuItem itemName="Genre">
              {
                // Render a menu sub-item for each entry in the mapGenreToId object
                Object.keys(mapGenreToId).map((genre, index) => (
                  <MainMenuSubItem
                    setIsOpen={setIsPopupOpen}
                    key={index}
                    itemPath={"/genre/" + mapGenreToId[genre]}
                    mobileMode
                  >
                    {genre}
                  </MainMenuSubItem>
                ))
              }
              {
                // Also render All Movies link
                <MainMenuSubItem
                  itemPath="/genre/all-movies"
                  setIsOpen={setIsPopupOpen}
                  mobileMode
                >
                  All Movies
                </MainMenuSubItem>
              }
            </MobileMainMenuItem>

            <MobileMainMenuItem itemName="Country">
              {
                // Render a menu sub-item for each entry in the mapCountryNounToAdjective object
                Object.keys(mapCountryNounToAdjective).map((country, index) => (
                  <MainMenuSubItem
                    key={index}
                    itemPath={"/country/" + country.toLowerCase()}
                    setIsOpen={setIsPopupOpen}
                    mobileMode
                  >
                    {country}
                  </MainMenuSubItem>
                ))
              }
            </MobileMainMenuItem>

            <MobileMainMenuItem itemName="Subtitle Language">
              {
                // Render a menu sub-item for each entry in the mapLanguageToCode object
                Object.keys(mapLanguageToCode).map((language, index) => (
                  <MainMenuSubItem
                    key={index}
                    itemPath={"/subtitles_languages/" + language.toLowerCase()}
                    setIsOpen={setIsPopupOpen}
                    mobileMode
                  >
                    <span className="language-code">
                      {mapLanguageToCode[language] + " "}
                    </span>
                    {language}
                  </MainMenuSubItem>
                ))
              }
            </MobileMainMenuItem>

            <MobileMainMenuItem itemName="Decade">
              {
                // Render a menu sub-item for each entry in the allDecadesArray
                allDecadesArray.map((decade) => (
                  <MainMenuSubItem
                    key={decade}
                    itemPath={"/decades/" + decade}
                    setIsOpen={setIsPopupOpen}
                    mobileMode
                  >
                    {decade}
                  </MainMenuSubItem>
                ))
              }
            </MobileMainMenuItem>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMainMenu;
