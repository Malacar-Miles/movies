// Renders the site's main header

import "./main-header.scss";

import { Outlet, Link } from "react-router-dom";

import MainMenu from "../main-menu/main-menu";
import MobileMainMenu from "../mobile-main-menu/mobile-main-menu";
import { useDetectScreenWidth } from "../../hooks/detect-mobile-screen-size";

const MainHeader = () => {
  const screenWidth = useDetectScreenWidth();

  return (
    <>
      <header className="main-header">
        <Link to="/">
          <img className="logo" src="/img/logo.png" alt="Logo" />
        </Link>
        {screenWidth < 1000 ? <MobileMainMenu /> : <MainMenu />}
      </header>
      <main className="main-section">
        <Outlet />
      </main>
    </>
  );
};

export default MainHeader;
