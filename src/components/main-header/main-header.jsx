// Renders the site's main header

import MainMenu from "../main-menu/main-menu";

import "./main-header.scss";

const MainHeader = () => {
  return (
    <header className="main-header">
      <img className="logo" src="img/logo.png" alt="Logo" />
      <MainMenu />
    </header>
  );
};

export default MainHeader;