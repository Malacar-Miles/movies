// This is a mobile version of MainMenuItem component.

// I've decided to make a separate component rather than
// add lots of conditionals to the existing component
// because I think this will make the code easier to read.

import "./mobile-main-menu-item.scss";

import { useState } from "react";

const MobileMainMenuItem = ({ itemName, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHeaderClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mobile-menu-item">
      <div className="item-header" onClick={handleHeaderClick}>
        <h2>
          {`Movies by ${itemName.toLowerCase()}`}
          <span className={isOpen ? "arrow-up" : "arrow-down"}></span>
        </h2>
      </div>
      {isOpen && <div className="sub-items-container">{children}</div>}
    </div>
  );
};

export default MobileMainMenuItem;
