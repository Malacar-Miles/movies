import "./decorative-element.scss";

import { useState, useEffect } from "react";

import { useDetectScreenWidth } from "../../hooks/detect-mobile-screen-size";
import DynamicText from "../dynamic-text/dynamic-text";

const DecorativeElement = ({ decoratorType }: { decoratorType: string }) => {
  const screenWidth = useDetectScreenWidth();
  const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (moveEvent: MouseEvent) => {
      // Calculate the relative position of the cursor on the screen
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

  // Set inline styles for decorative elements because setting background images via SCSS doesn't work
  const redPolygonStyle = {
    background: "url(/img/red-polygon.png)",
    backgroundSize: "contain",
    transform: "none"
  };
  const whitePolygonStyle = {
    background: "url(/img/white-polygon.png)",
    backgroundSize: "contain",
    transform: "none"
  };
  const girlStyle = {
    background: "url(/img/girl.png)",
    backgroundSize: "contain",
    transform: "none"
  };
  const bigWhitePolygonStyle = {
    background: "url(/img/white-polygon-big.png)",
    backgroundSize: "contain",
    transform: "none"
  };

  // Do the calculations only if we'll need the results
  let headerStyle = undefined,
    subHeaderStyle = undefined;
  if (enableDecoratorMovement) {
    // Calculate the base offset we will use to set the styles of multiple elements
    let baseOffset = {
      x: Math.round((relativePosition.x - 0.5) * 20) * -1,
      y: Math.round((relativePosition.y - 0.5) * 20),
    };

    // Add dynamically calculated offset to each decorator's style
    redPolygonStyle.transform = `translate3d(${baseOffset.x}px, ${baseOffset.y}px, 0px)`;
    whitePolygonStyle.transform = `translate3d(${baseOffset.x * -1}px, ${
      baseOffset.y
    }px, 0px)`;
    bigWhitePolygonStyle.transform = whitePolygonStyle.transform;
    girlStyle.transform = `translate3d(${baseOffset.x * -1}px, ${
      baseOffset.y * -1
    }px, 0px)`;

    // Create a style object to give offset to the homepage header (only moves horizontally)
    headerStyle = {
      transform: `translate3d(${baseOffset.x * -1}px, 0px, 0px)`,
    };

    // Create a style object to give offset to the homepage subheader (the opposite from header, moves faster)
    subHeaderStyle = {
      transform: `translate3d(${baseOffset.x * 2}px, 0px, 0px)`,
    };
  }

  // Render each element conditionally
  return (
    <>
      {decoratorType === "homepage-decorator" && (
        <>
          {enableDecorators && (
            <div
              className="decorative-image-red-poligon"
              style={redPolygonStyle}
            ></div>
          )}
          {enableRichDecorators && (
            <div className="decorative-image-girl" style={girlStyle}></div>
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

      {decoratorType === "category-page-decorator" && screenWidth > 722 && (
        <div
          className="decorative-image-white-poligon"
          style={whitePolygonStyle}
        ></div>
      )}

      {decoratorType === "movie-page-decorator" && screenWidth > 1060 && (
        <div
          className="decorative-image-white-poligon-big"
          style={bigWhitePolygonStyle}
        ></div>
      )}
    </>
  );
};

export default DecorativeElement;
