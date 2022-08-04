// Take link text and link path as props and render a link

import "./main-menu-sub-item.scss";

import { Link } from "react-router-dom";

const MainMenuSubItem = ({ itemPath, children }) => {
  return (
    <div className="menu-sub-item">
      <h3>
        <Link to={itemPath}>{children}</Link>
      </h3>
    </div>
  );
};

export default MainMenuSubItem;
