"use client";
import React from "react";
import ExitIcon from "./icons/ExitIcon";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const BurguerMenu = ({ open, setOpen }: Props) => {
  return (
    <div
      className={`
         fixed inset-0 z-9000 flex flex-col gap-30 justify-center items-center
        transition-all duration-300  text-[#F2ECE2] text-4xl  text-center  bg-black/97
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }
      `}
    >
      <h1 className={` ${syncopate.className} font-sans text-7xl`}>
        LOUI KANG
      </h1>
      <div
        className={` ${inter.className}   flex flex-col  font-display gap-10 items-center`}
      >
        <a href="#hero" onClick={() => setOpen(false)}>
          INICIO
        </a>
        <a href="#bio" onClick={() => setOpen(false)}>
          BIO
        </a>
        <a href="#music" onClick={() => setOpen(false)}>
          MUSIC
        </a>
        <a href="#social" onClick={() => setOpen(false)}>
          SOCIAL
        </a>
        <button onClick={() => setOpen(false)}>
          {" "}
          <ExitIcon className="cursor-pointer w-15 "></ExitIcon>{" "}
        </button>
      </div>
    </div>
  );
};

export default BurguerMenu;
