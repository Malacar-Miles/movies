// Renders a menu item (link) for the main menu

import "./main-menu-item.scss";

const MainMenuItem = ({
  itemName,
  containerType,
  openMenuItem,
  setOpenMenuItem,
  children,
}: {
  itemName: string;
  containerType: string;
  openMenuItem: string | null;
  setOpenMenuItem: React.Dispatch<React.SetStateAction<string | null>>;
  children: React.ReactNode;
}) => {
  const handleMouseOver = () => {
    setOpenMenuItem(itemName);
  };

  const handleMouseOut = () => {
    setOpenMenuItem(null);
  };

  const handleHeaderClick = () => {
    setOpenMenuItem(null);
  };

  return (
    <div className="menu-item" onMouseOver={handleMouseOver}>
      <div className="item-header">
        <h2>{itemName}</h2>
      </div>
      {openMenuItem === itemName && (
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
