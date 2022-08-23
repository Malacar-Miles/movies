import "./decorative-element.scss";

import { useState, useEffect } from "react";

const DecorativeElement = ({ decoratorType }) => {
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

  // Calculate the offset we will set for the polygon based on relativePosition
  const polygonOffset = {
    x: Math.round((relativePosition.x - 0.5) * 20) * -1,
    y: Math.round((relativePosition.y - 0.5) * 20),
  };

  // Create a style object to give offset to the polygon
  const polygonStyle = {
    transform: `translate3d(${polygonOffset.x}px, ${polygonOffset.y}px, 0px)`,
  };

  // Create a style object to give offset to the girl (the opposite from the poligon offset)
  const girlStyle = {
    transform: `translate3d(${polygonOffset.x * -1}px, ${polygonOffset.y * -1}px, 0px)`,
  };

  return (
    <>
      <img
        className="decorative-image-red-poligon"
        src="/img/red-polygon.png"
        alt=""
        style={polygonStyle}
      ></img>

      <img
        className="decorative-image-girl"
        src="/img/girl.png"
        alt=""
        style={girlStyle}
      ></img>
    </>
  );
};

export default DecorativeElement;
