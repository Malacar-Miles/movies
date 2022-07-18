// Renders the main menu with links

import MainMenuItem from "../main-menu-item/main-menu-item";
import "./main-menu.scss";

const MainMenu = () => {
  return (
    <div className="main-menu">
      <MainMenuItem itemName="Genre" />
      <MainMenuItem itemName="Country" />
      <MainMenuItem itemName="Subtitle Language" />
      <MainMenuItem itemName="Decade" />
      <MainMenuItem itemName="Search" />
      <MainMenuItem itemName="Log In" />
    </div>
  );
};

export default MainMenu;