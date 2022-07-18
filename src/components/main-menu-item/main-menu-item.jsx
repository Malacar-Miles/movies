// Renders a menu item (link) for the main menu

import "./main-menu-item.scss";

const MainMenuItem = ({ itemName }) => {
  return (
    <div className="menu-item">
      <h2>{itemName.toUpperCase()}</h2>
    </div>
  );
};

export default MainMenuItem;