import React from "react";
import YtMusicIcon from "./icons/YtMusicIcon";
import SpotifyIcon from "./icons/SpotifyIcon";
import InstagramIcon from "./icons/InstagramIcon";
import YouTubeIcon from "./icons/YouTubeIcon";
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
const Footer = () => {
  return (
    <div className="flex flex-col justify-center  bg-white/10 pt-5">
      <h1
        className={` ${syncopate.className} text-[#F2ECE2] text-4xl  flex font-bold text-center z-10 drop-shadow-lg  max-w-xs md:max-w-full self-center `}
      >
        LOUI KANG
      </h1>

      <div className="grid mt-4 grid-cols-2 gap-x-4 gap-y-1 md:flex justify-center md:gap-x-5 justify-items-center w-fit mx-auto md:gap-x-20 lg:gap-x-30 xl:lg:gap-x-50">
        <div>
          <a
            href="https://music.youtube.com/channel/UCwbVPQnlAFwhyo_JgPDINAQ"
            target="_blank"
          >
            <YtMusicIcon className=" w-12 md:w-18  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] "></YtMusicIcon>
          </a>
        </div>
        <div>
          <a
            href="https://open.spotify.com/artist/7AaZu0M1AMO6fAKyDv4dt2"
            target="_blank"
          >
            <SpotifyIcon className="w-12 md:w-18  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"></SpotifyIcon>
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com/louikang_/" target="_blank">
            <InstagramIcon className="w-12 md:w-18  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] "></InstagramIcon>
          </a>
        </div>
        <div>
          <a href="https://www.youtube.com/@LouiKng" target="_blank">
            <YouTubeIcon className="w-12 md:w-18  inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"></YouTubeIcon>
          </a>
        </div>
      </div>
      <p
        className={`${inter.className} text-xl flex  leading-relaxed text-center text-[#F2ECE2] justify-center`}
      >
        © 2026 Loui Kang
      </p>
    </div>
  );
};

export default Footer;
