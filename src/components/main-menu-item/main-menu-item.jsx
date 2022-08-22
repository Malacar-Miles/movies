// Renders a menu item (link) for the main menu

import "./main-menu-item.scss";

import { useState } from "react";

const MainMenuItem = ({ itemName, containerType, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseOver = () => {
    setIsOpen(true);
  };

  const handleMouseOut = () => {
    setIsOpen(false);
  };

  const handleHeaderClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="menu-item" onMouseOver={handleMouseOver}>
      <div className="item-header">
        <h2>{itemName}</h2>
      </div>
      {isOpen && (
        <div className="sub-menu" onMouseOut={handleMouseOut}>
          <div className="item-header-internal" onClick={handleHeaderClick}>
            <h2>{itemName}</h2>
          </div>
          <div className={`sub-items-container ${containerType}`}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenuItem;
