"use client";
import React from "react";

import YtMusicIcon from "./icons/YtMusicIcon";
import SpotifyIcon from "./icons/SpotifyIcon";
import InstagramIcon from "./icons/InstagramIcon";
import YouTubeIcon from "./icons/YouTubeIcon";
import BurguerMenuIcon from "./icons/BurguerMenuIcon";
import { Syncopate } from "next/font/google";
import { Inter } from "next/font/google";

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
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHeroVisible: boolean;
}

const Navbar = ({ setOpen, isHeroVisible }: Props) => {
  return (
    <div className="fixed top-0 left-0 bg-[#0F1115]/90 flex items-center justify-between w-full z-10 gap-x-2  px-6 md:px-12 lg:px-12 backdrop-blur-md h-25 md:h-36 ">
      <button onClick={() => setOpen(true)}>
        <BurguerMenuIcon className=" inline-block  w-10 md:hidden "></BurguerMenuIcon>
      </button>

      <div
        className={` ${inter.className} hidden md:flex font-display text-[#F2ECE2] text-xl   flex-col   text-center place-self-center  `}
      >
        <a
          className={` inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] $ `}
          href="#hero"
        >
          INICIO
        </a>

        <a
          className="inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] "
          href="#bio"
        >
          BIO
        </a>

        <a
          className="inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] "
          href="#music"
        >
          MUSIC
        </a>

        <a
          className="inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          href="#social"
        >
          SOCIAL
        </a>
      </div>

      <div className="relative flex md:flex-1 justify-center  pt-2 w-60 h-15  md:h-27 ">
        <div
          className={`absolute items-center  flex gap-x-5 md:gap-10 lg:gap-40  transition-all duration-500 ${
            isHeroVisible
              ? "opacity-100 scale-100"
              : " opacity-0 scale-95 pointer-events-none "
          }`}
        >
          <a
            href="https://music.youtube.com/channel/UCwbVPQnlAFwhyo_JgPDINAQ"
            target="_blank"
          >
            <YtMusicIcon className=" w-12 md:w-20  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] "></YtMusicIcon>
          </a>
          <a
            href="https://open.spotify.com/artist/7AaZu0M1AMO6fAKyDv4dt2"
            target="_blank"
          >
            <SpotifyIcon className="w-12 md:w-20  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"></SpotifyIcon>
          </a>
          <a href="https://www.instagram.com/louikang_/" target="_blank">
            <InstagramIcon className="w-12 md:w-20  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] "></InstagramIcon>
          </a>
          <a href="https://www.youtube.com/@LouiKng" target="_blank">
            <YouTubeIcon className="w-12 md:w-20  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"></YouTubeIcon>
          </a>
        </div>
        <div
          className={` ${syncopate.className}  pointer-events-none absolute transition-all duration-500   ${
            isHeroVisible ? "opacity-0 scale-95  " : "opacity-100 scale-100"
          }`}
        >
          <h1
            className={` ${syncopate.className}  z-10 text-[#F2ECE2]  text-3xl  md:text-6xl  font-bold text-center drop-shadow-black `}
          >
            LOUI KANG
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
