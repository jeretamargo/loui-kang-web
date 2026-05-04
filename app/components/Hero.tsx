import React, { Dispatch, Ref, RefObject, SetStateAction } from "react";
import { Syncopate } from "next/font/google";
const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["700"],
});

type HeroProps = {
  heroRef: React.RefObject<HTMLDivElement | null>;
  setIsVideoLoaded: (val: boolean) => void;
};

const Hero = ({ heroRef, setIsVideoLoaded }: HeroProps) => {
  return (
    <section className="relative" id="hero" ref={heroRef}>
      <video
        className="relative w-full h-screen pt-20 overflow-hidden object-cover object-[center_25%] "
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="/videos/hero.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center translate-y-40">
        <h1
          className={` ${syncopate.className}   text-[#F2ECE2]  text-7xl  md:text-9xl  font-bold text-center z-10 drop-shadow-black`}
        >
          LOUI KANG
        </h1>
      </div>
      {/* FADE BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full z-5 h-32 bg-linear-to-t from-[#0F1115] to-transparent pointer-events-none " />
    </section>
  );
};

export default Hero;
