import React from "react";
import Carousel from "./Carousel";
import { Kanit, Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["400", "700"],
});

const Bio = () => {
  return (
    <div
      className="flex flex-col md:flex-row px-6 md:px-12 lg:px-12 py-15   items-center gap-5 place-content-start "
      id="bio"
    >
      <h2
        className={` ${kanit.className} text-7xl flex md:hidden  leading-relaxed  text-[#F2ECE2] self-start `}
      >
        BIO
      </h2>
      <div className=" flex">
        <Carousel></Carousel>
      </div>
      <div className="flex flex-col  text-[#F2ECE2] justify-center max-w-125 order-3">
        <div className="flex flex-wrap ">
          <h2
            className={` ${kanit.className} text-7xl  hidden md:block  leading-relaxed  text-[#F2ECE2] `}
          >
            BIO
          </h2>
          <p
            className={` ${inter.className}   text-2xl leading-relaxed flex flex-wrap`}
          >
            Loui Kang es un artista paraguayo radicado en Ushuaia, donde el
            aislamiento y el frío moldean su identidad sonora. Su música cruza
            emoción cruda, noches intensas y una narrativa de caída y superación
            constante. Entre lo íntimo y lo explosivo, construye un universo
            donde el caos siempre empuja hacia adelante
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
