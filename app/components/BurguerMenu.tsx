"use client";
import React from "react";
import ExitIcon from "./icons/ExitIcon";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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

const BurguerMenu = ({ open, setOpen }: Props) => {
  return (
    <div
      className={`
         fixed inset-0 z-50 flex flex-col gap-30 justify-center items-center
        transition-all duration-300  text-[#F2ECE2] text-5xl  text-center  bg-black
        ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }
      `}
    >
      <h1 className={` ${kanit.className} font-sans text-7xl`}>LOUI KANG</h1>
      <div
        className={` ${inter.className}   flex flex-col  font-display gap-10 items-center`}
      >
        <a href="#">INICIO</a>
        <a href="#">BIO</a>
        <a href="#">MUSIC</a>
        <a href="#">SOCIAL</a>
        <button onClick={() => setOpen(false)}>
          {" "}
          <ExitIcon className="cursor-pointer w-15 "></ExitIcon>{" "}
        </button>
      </div>
    </div>
  );
};

export default BurguerMenu;
