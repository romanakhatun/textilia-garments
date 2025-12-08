import React, { useState, useEffect } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      // Adjust scroll threshold as needed
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-primary fixed bottom-5 right-5 z-50 rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
        >
          <FaArrowUpLong className="text-white" />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
