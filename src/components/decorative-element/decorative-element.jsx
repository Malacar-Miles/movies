import "./decorative-element.scss";

import { useState, useEffect } from "react";

import { useDetectScreenWidth } from "../../hooks/detect-mobile-screen-size";
import DynamicText from "../dynamic-text/dynamic-text";

const DecorativeElement = ({ decoratorType }) => {
  const screenWidth = useDetectScreenWidth();
  const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (moveEvent) => {
      // Calculate the relative position of cursor on the screen
      // x === 0 means the cursor is in the leftmost position,
      // x === 1 means it's in the rightmost position.
      const { clientX, clientY } = moveEvent;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      setRelativePosition({ x, y });
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  // This flag enables the movement of decorators tied to mouse cursor movement
  const enableDecoratorMovement = screenWidth > 1000;

  // This flag enables the display of the girl image on the homepage
  const enableRichDecorators = screenWidth >= 850;

  // This flag enables the display of decorative polygons on all pages
  const enableDecorators = screenWidth >= 640;

  // Do the calculations only if we'll need the results
  let polygonOffset = null,
    polygonStyle = null,
    whitePolygonStyle = null,
    girlStyle = null,
    headerStyle = null,
    subHeaderStyle = null;
  if (enableDecoratorMovement) {
    // Calculate the offset we will set for the polygon based on relativePosition
    polygonOffset = {
      x: Math.round((relativePosition.x - 0.5) * 20) * -1,
      y: Math.round((relativePosition.y - 0.5) * 20),
    };

    // Create a style object to give offset to the polygon
    polygonStyle = {
      transform: `translate3d(${polygonOffset.x}px, ${polygonOffset.y}px, 0px)`,
    };
    whitePolygonStyle = 
    {
      transform: `translate3d(${polygonOffset.x * -1}px, ${polygonOffset.y}px, 0px)`,
    };

    // Create a style object to give offset to the girl (the opposite from the poligon offset)
    girlStyle = {
      transform: `translate3d(${polygonOffset.x * -1}px, ${
        polygonOffset.y * -1
      }px, 0px)`,
    };

    // Create a style object to give offset to the homepage header (only moves horizontally)
    headerStyle = {
      transform: `translate3d(${polygonOffset.x * -1}px, 0px, 0px)`,
    };

    // Create a style object to give offset to the homepage subheader (the opposite from header, moves faster)
    subHeaderStyle = {
      transform: `translate3d(${polygonOffset.x * 2}px, 0px, 0px)`,
    };
  }

  // Render each element conditionally
  return (
    <>
      {decoratorType === "homepage-decorator" && (
        <>
          {enableDecorators && (
            <img
              className="decorative-image-red-poligon"
              src="/img/red-polygon.png"
              alt=""
              style={polygonStyle}
            ></img>
          )}
          {enableRichDecorators && (
            <img
              className="decorative-image-girl"
              src="/img/girl.png"
              alt=""
              style={girlStyle}
            ></img>
          )}
          <h1 className="homepage-header" style={headerStyle}>
            Eastern European Movies
          </h1>
          {enableDecorators ? (
            <span className="homepage-subheader" style={subHeaderStyle}>
              <DynamicText />
            </span>
          ) : (
            <span className="homepage-subheader">With English Subtitles</span>
          )}
        </>
      )}

      {(decoratorType === "category-page-decorator" && screenWidth > 722) && (
        <img
          className="decorative-image-white-poligon"
          src="/img/white-polygon.png"
          alt=""
          style={whitePolygonStyle}
        ></img>
      )}

      {(decoratorType === "movie-page-decorator" && screenWidth > 1060) && (
        <img
          className="decorative-image-white-poligon-big"
          src="/img/white-polygon-big.png"
          alt=""
          style={whitePolygonStyle}
        ></img>
      )}
    </>
  );
};

export default DecorativeElement;
