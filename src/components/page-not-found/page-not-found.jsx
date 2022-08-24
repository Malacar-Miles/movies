import "./page-not-found.scss";

import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="image-container">
        <img
          className="page-not-found-full-image"
          src="/img/404-full.png"
          alt="Page not found"
        />
      </div>
      <Link className="link-to-main-page" to="/">
        Home Page
      </Link>
    </div>
  );
};

export default PageNotFound;
