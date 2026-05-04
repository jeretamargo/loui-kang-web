import React from "react";
import { Syncopate } from "next/font/google";

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["700"],
});
const Loader = () => {
  return (
    <div className="  fixed inset-0 flex flex-col items-center justify-center gap-y-20">
      <h1
        className={` ${syncopate.className}  z-10 text-[#F2ECE2]  text-6xl  md:text-7xl  font-bold text-center drop-shadow-black `}
      >
        LOUI KANG
      </h1>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
