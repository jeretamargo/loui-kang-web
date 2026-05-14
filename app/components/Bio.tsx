import React from "react";
import Carousel from "./Carousel";
import { Syncopate, Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["700"],
});

const Bio = () => {
  return (
    <section
      className="flex flex-col lg:flex-row px-6 md:px-12 lg:px-12 py-15   items-center gap-5 place-content-start 2xl:gap-60"
      id="bio"
    >
      <h2
        className={` ${syncopate.className} text-6xl 2xl:text-7xl flex lg:hidden  leading-relaxed  text-[#F2ECE2] self-start `}
      >
        BIO
      </h2>
      <div className=" flex">
        <Carousel></Carousel>
      </div>
      <div className="flex flex-col  text-[#F2ECE2] justify-center max-w-125 order-3 2xl:gap-10">
        <div className="flex flex-wrap ">
          <h2
            className={` ${syncopate.className} text-7xl  hidden lg:block  leading-relaxed  text-[#F2ECE2] `}
          >
            BIO
          </h2>
          <p
            className={` ${inter.className}  text-center lg:text-left lg:text-2xl text-xl   leading-relaxed flex flex-wrap`}
          >
            José Luis Kang Vanni nacido en la ciudad de Asunción del Paraguay el
            1 de agosto del 2001 es conocido con el seudónimo “Loui Kang”
            actualmente radicado en Ushuaia/Argentina, donde el aislamiento y el
            frío moldean su identidad sonora. Su música cruza emoción cruda,
            noches intensas y una narrativa de caída y superación constante.
            Entre lo íntimo y lo explosivo, construye un universo donde el caos
            y las experiencias personales siempre empujan hacia adelante.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Bio;
