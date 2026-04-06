"use-client";
import React from "react";

const Hero = () => {
  return (
    <div className="relative">
      <video
        className="relative w-full h-screen pt-20 overflow-hidden object-cover object-[center_25%] "
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center translate-y-46">
        <h1 className="  text-[#F2ECE2] text-9xl  font-bold text-center z-10 drop-shadow-lg">
          LOUI KANG
        </h1>
      </div>
      {/* FADE BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0F1115] to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Hero;
