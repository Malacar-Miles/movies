// Renders the navigation main menu with dynamically generated sub-menus

import "./main-menu.scss";

import MainMenuItem from "../main-menu-item/main-menu-item";
import MainMenuSubItem from "../main-menu-sub-item/main-menu-sub-item";
import { mapGenreToId } from "../../utils/menu-logic/genres";
import { mapCountryNounToAdjective } from "../../utils/menu-logic/countries";
import { allDecadesArray } from "../../utils/menu-logic/decades";
import { mapLanguageToCode } from "../../utils/menu-logic/language-codes";

const MainMenu = () => {
  return (
    <nav className="main-menu">
      <MainMenuItem itemName="Genre" containerType="genres">
        {
          // Render a menu sub-item for each entry in the mapGenreToId object
          Object.keys(mapGenreToId).map((genre, index) => (
            <MainMenuSubItem
              key={index}
              itemPath={"/genre/" + mapGenreToId[genre]}
            >
              {genre}
            </MainMenuSubItem>
          ))
        }
      </MainMenuItem>

      <MainMenuItem itemName="Country" containerType="other">
        {
          // Render a menu sub-item for each entry in the mapCountryNounToAdjective object
          Object.keys(mapCountryNounToAdjective).map((country, index) => (
            <MainMenuSubItem
              key={index}
              itemPath={"/country/" + country.toLowerCase()}
            >
              {country}
            </MainMenuSubItem>
          ))
        }
      </MainMenuItem>

      <MainMenuItem itemName="Subtitle Language" containerType="subs">
        {
          // Render a menu sub-item for each entry in the mapLanguageToCode object
          Object.keys(mapLanguageToCode).map((language, index) => (
            <MainMenuSubItem
              key={index}
              itemPath={"/subtitles_languages/" + language.toLowerCase()}
            >
              <span className="language-code">
                {mapLanguageToCode[language] + " "}
              </span>
              {language}
            </MainMenuSubItem>
          ))
        }
      </MainMenuItem>

      <MainMenuItem itemName="Decade" containerType="other">
        {
          // Render a menu sub-item for each entry in the allDecadesArray
          allDecadesArray.map((decade) => (
            <MainMenuSubItem key={decade} itemPath={"/decades/" + decade}>
              {decade}
            </MainMenuSubItem>
          ))
        }
      </MainMenuItem>

      <img
        className="search-icon"
        alt="Search icon"
        src="/img/search-icon.svg"
      />
    </nav>
  );
};

export default MainMenu;
