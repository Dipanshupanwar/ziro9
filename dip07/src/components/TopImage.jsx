import React, { useState, useEffect } from "react";

const images = [
  "assets/Drop_4.0_banner_web_1.webp",
  "assets/2-5_zero9_web_banner_web_1.webp",
  "assets/Banner_2_web.webp",
];

function TopImage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, 2900);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  useEffect(() => {
    if (fadeOut) {
      const changeImageTimeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFadeOut(false);
      }, 300);
      return () => clearTimeout(changeImageTimeout);
    }
  }, [fadeOut]);

  return (
    <div className="w-full mt-[rem] flex justify-center items-center overflow-hidden">
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Banner ${currentIndex}`}
        className={`w-full max-h-[600px] object-contain transition-opacity duration-300 ease-in-out ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

export default TopImage;
