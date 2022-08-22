import { useState, useEffect } from "react";

// This hook returns a function which returns true if the browser's window width is less than 1000 (otherwise returns false)

export const useDetectMobileScreenSize = () => {
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return () => windowSize.innerWidth < 1000;
};