"use client";
import React from "react";

import YtMusicIcon from "./icons/YtMusicIcon";
import SpotifyIcon from "./icons/SpotifyIcon";
import InstagramIcon from "./icons/InstagramIcon";
import YouTubeIcon from "./icons/YouTubeIcon";
import BurguerMenuIcon from "./icons/BurguerMenuIcon";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setOpen }: Props) => {
  return (
    <div className="fixed bg-[#0F1115]/90 flex items-center justify-between w-full z-10 gap-2  px-6 md:px-12 lg:px-12 backdrop-blur-md">
      <button onClick={() => setOpen(true)}>
        <BurguerMenuIcon className=" inline-block  w-10 md:hidden pt-5"></BurguerMenuIcon>
      </button>

      <div
        className={` ${inter.className} hidden md:flex font-display text-[#F2ECE2] text-xl   flex-col   text-center place-self-center pt-2 `}
      >
        <a
          className="inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] "
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
          href="#"
        >
          MUSIC
        </a>

        <a
          className="inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          href="#"
        >
          SOCIAL
        </a>
      </div>
      <div className=" flex md:flex-1 justify-center pt-2 ">
        <div className="flex gap-5 md:gap-10 lg:gap-40">
          <a href="https://music.youtube.com/channel/UCwbVPQnlAFwhyo_JgPDINAQ">
            <YtMusicIcon className=" w-12 md:w-24  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] "></YtMusicIcon>
          </a>
          <a href="https://open.spotify.com/artist/7AaZu0M1AMO6fAKyDv4dt2">
            <SpotifyIcon className="w-12 md:w-24  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"></SpotifyIcon>
          </a>
          <a href="https://www.instagram.com/louikang_/">
            <InstagramIcon className="w-12 md:w-24  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] "></InstagramIcon>
          </a>
          <a href="https://www.youtube.com/@LouiKng">
            <YouTubeIcon className="w-12 md:w-24  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"></YouTubeIcon>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
