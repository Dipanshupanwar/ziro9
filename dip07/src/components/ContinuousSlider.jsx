import React from "react";

function ContinuousSlider() {
  const text = "New Arrivals";
  const repetitions = 5; // Repeat more for smoother loop
  const animationDuration = 6; // Slower, smoother scroll

  return (
    <div className=" overflow-hidden py-4 mt-8">
      <div 
        className="scrolling-text__wrapper"
        style={{ 
          "--marquee-animation-duration": `${animationDuration}s`,
          display: "flex",
          whiteSpace: "nowrap",
          willChange: "transform",
          animation: `marquee var(--marquee-animation-duration) linear infinite`,
        }}
      >
        {[...Array(repetitions)].map((_, i) => (
          <span 
            key={i}
            className="text-white text-2xl font-bold tracking-widest"
            style={{
              marginRight: "60px",
              display: "inline-block",
            }}
          >
            {text}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        @media (prefers-reduced-motion) {
          .scrolling-text__wrapper {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

export default ContinuousSlider;
