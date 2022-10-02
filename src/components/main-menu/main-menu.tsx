// Renders the navigation main menu with dynamically generated sub-menus

import "./main-menu.scss";

import { Link } from "react-router-dom";
import { useState } from "react";

import MainMenuItem from "../main-menu-item/main-menu-item";
import MainMenuSubItem from "../main-menu-sub-item/main-menu-sub-item";
import SearchWidget from "../search-widget/search-widget";
import { mapGenreToId } from "../../utils/menu-logic/genres";
import { mapCountryNounToAdjective } from "../../utils/menu-logic/countries";
import { allDecadesArray } from "../../utils/menu-logic/decades";
import { mapLanguageToCode } from "../../utils/menu-logic/language-codes";

const MainMenu = () => {
  const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);

  return (
    <nav className="main-menu">
      <MainMenuItem
        itemName="Genre"
        containerType="genres"
        openMenuItem={openMenuItem}
        setOpenMenuItem={setOpenMenuItem}
      >
        {
          // Render a menu sub-item for each entry in the mapGenreToId object
          Object.keys(mapGenreToId).map((genre, index) => (
            <MainMenuSubItem
              key={index}
              itemPath={"/genre/" + mapGenreToId[genre]}
              setIsOpen={setOpenMenuItem}
            >
              {genre}
            </MainMenuSubItem>
          ))
        }
        {
          // Also render All Movies button.
          <div className="all-movies-button">
            <Link
              to="/genre/all-movies"
              onClick={() => {
                setOpenMenuItem(null);
              }}
            >
              All Movies
            </Link>
          </div>
        }
      </MainMenuItem>

      <MainMenuItem
        itemName="Country"
        containerType="other"
        openMenuItem={openMenuItem}
        setOpenMenuItem={setOpenMenuItem}
      >
        {
          // Render a menu sub-item for each entry in the mapCountryNounToAdjective object
          Object.keys(mapCountryNounToAdjective).map((country, index) => (
            <MainMenuSubItem
              key={index}
              itemPath={"/country/" + country.toLowerCase()}
              setIsOpen={setOpenMenuItem}
            >
              {country}
            </MainMenuSubItem>
          ))
        }
      </MainMenuItem>

      <MainMenuItem
        itemName="Subtitle Language"
        containerType="subs"
        openMenuItem={openMenuItem}
        setOpenMenuItem={setOpenMenuItem}
      >
        {
          // Render a menu sub-item for each entry in the mapLanguageToCode object
          Object.keys(mapLanguageToCode).map((language, index) => (
            <MainMenuSubItem
              key={index}
              itemPath={"/subtitles_languages/" + language.toLowerCase()}
              setIsOpen={setOpenMenuItem}
            >
              <span className="language-code">
                {mapLanguageToCode[language] + " "}
              </span>
              {language}
            </MainMenuSubItem>
          ))
        }
      </MainMenuItem>

      <MainMenuItem
        itemName="Decade"
        containerType="other"
        openMenuItem={openMenuItem}
        setOpenMenuItem={setOpenMenuItem}
      >
        {
          // Render a menu sub-item for each entry in the allDecadesArray
          allDecadesArray.map((decade) => (
            <MainMenuSubItem
              key={decade}
              itemPath={"/decades/" + decade}
              setIsOpen={setOpenMenuItem}
            >
              {decade}
            </MainMenuSubItem>
          ))
        }
      </MainMenuItem>

      <SearchWidget />
    </nav>
  );
};

export default MainMenu;
