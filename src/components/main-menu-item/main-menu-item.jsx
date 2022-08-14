// Renders a menu item (link) for the main menu

import "./main-menu-item.scss";

import { useState } from "react";
import { Link } from "react-router-dom";

const MainMenuItem = ({ itemName, containerType, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseOver = () => {
    setIsOpen(true);
  };

  const handleMouseOut = () => {
    setIsOpen(false);
  };

  return (
    <div className="menu-item" onMouseOver={handleMouseOver}>
      <div className="item-header">
        <h2>{itemName}</h2>
      </div>
      {isOpen && (
        <div className="sub-menu" onMouseOut={handleMouseOut}>
          <div className="item-header-internal">
            <h2>{itemName}</h2>
          </div>
          <div className={`sub-items-container ${containerType}`}>{children}</div>
          {containerType === "genres" && (
            <div className="all-movies-button">
              <Link to="/genre/all-movies">All Movies</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainMenuItem;
