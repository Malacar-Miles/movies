// Take link text and link path as props and render a link

// The prop setIsOpen is only used in mobile mode to pass the function that closes the current menu item,
// while setIsPopupOpen is only used in desktop mode to pass the function that closes the whole menu

import "./main-menu-sub-item.scss";

import { Link } from "react-router-dom";

const MainMenuSubItem = ({
  itemPath,
  children,
  setIsOpen,
  setIsPopupOpen,
  mobileMode,
}: {
  itemPath: string;
  children: React.ReactNode;
  setIsOpen?: React.Dispatch<React.SetStateAction<string | null>>;
  setIsPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMode?: boolean;
}) => {
  const handleClick = () => {
    // If setIsOpen function has been passes as a prop,
    // then invoke it upon click in order to close the popup
    if (setIsOpen) setIsOpen(null);
    if (setIsPopupOpen) setIsPopupOpen(false);
  };

  return (
    <div className={`menu-sub-item ${mobileMode && "mobile-mode"}`}>
      <h3>
        <Link to={itemPath} onClick={handleClick}>
          {children}
        </Link>
      </h3>
    </div>
  );
};

export default MainMenuSubItem;
