import React, { useState } from "react";
import "./RippleButton.css";

function RippleButton({onButtonClick}) {
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });

  const handleMouseOver = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePosition({ x, y });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <button
        className="relative overflow-hidden w-full rounded-lg bg-gradient-to-r from-emerald-400 to-green-600 px-12 py-5 text-lg font-semibold text-white transition-all duration-300 ease-in-out"
        onMouseMove={handleMouseOver}
        style={{
          "--xpos": `${ripplePosition.x}px`,
          "--ypos": `${ripplePosition.y}px`,
        }}
        onClick={onButtonClick}
      >
        <span className="relative z-10">Enter Data</span>
        <div className="absolute -z-10 h-0 w-0 translate-x-[-50%] translate-y-[-50%] rounded-full bg-white/50 transition-all duration-500 ease-in-out hover:h-[400px] hover:w-[100%]"></div>
      </button>
    </div>
  );
}

export default RippleButton;
