// Take link text and link path as props and render a link

import "./main-menu-sub-item.scss";

import { Link } from "react-router-dom";

const MainMenuSubItem = ({ itemPath, children, setIsOpen, mobileMode }) => {
  const handleClick = () => {
    // If setIsOpen function has been passes as a prop,
    // then invoke it upon click in order to close the popup
    if (setIsOpen) setIsOpen(null);
  };

  return (
    <div className={`menu-sub-item ${mobileMode && "mobile-mode"}`}>
      <h3>
        <Link to={itemPath} onClick={handleClick}>{children}</Link>
      </h3>
    </div>
  );
};

export default MainMenuSubItem;
