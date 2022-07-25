// Renders the site's main header

import "./main-header.scss";

import MainMenu from "../main-menu/main-menu";

import { Outlet, Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <>
      <header className="main-header">
        <Link to="/">
          <img className="logo" src="/img/logo.png" alt="Logo" />
        </Link>
        <MainMenu />
      </header>
      <main className="main-section">
        <Outlet />
      </main>
    </>
  );
};

export default MainHeader;
