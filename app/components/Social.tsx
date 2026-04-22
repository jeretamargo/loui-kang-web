"use client";
import React from "react";

import { Syncopate, Inter } from "next/font/google";
import InstagramIcon from "./icons/InstagramIcon";
import YouTubeIcon from "./icons/YouTubeIcon";

import dynamic from "next/dynamic";
import { useScreen } from "../hooks/useScreen";

const InstagramEmbed = dynamic(
  () => import("react-social-media-embed").then((mod) => mod.InstagramEmbed),
  { ssr: false },
);

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

const Social = () => {
  const width = useScreen();
  return (
    <div className="flex flex-col   px-6 md:px-12 lg:px-15 py-15" id="social">
      <h2
        className={` ${syncopate.className} text-6xl 2xl:text-7xl flex   leading-relaxed  text-[#F2ECE2]  `}
      >
        SOCIAL
      </h2>
      <div className="flex flex-col lg:flex-row items-center gap-5 md:justify-evenly">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <InstagramEmbed
            url="https://www.instagram.com/p/DKOD-neA7iZ/"
            width={328}
          />
        </div>
        <iframe
          width={width < 768 ? "350" : "800"}
          height={width < 768 ? "280" : "450"}
          src="https://www.youtube.com/embed/bugNrXoYDjI?si=YtLRaJbQjogb3YeN&amp;start=6"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-col">
        <p
          className={`${inter.className} text-2xl md:text-3xl self-center flex mt-8 leading-relaxed text-center text-[#F2ECE2] `}
        >
          {" "}
          Sigue a Loui Kang{" "}
        </p>
        <div className=" flex w-full justify-evenly mt-4">
          <div className="flex flex-col items-center transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            <a href="https://www.instagram.com/louikang_/" target="_blank">
              <InstagramIcon className="w-10  md:w-15 2xl:w-20 inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] "></InstagramIcon>
            </a>
            <p
              className={`${inter.className} text-xl 2xl:text-3xl  flex  leading-relaxed text-center text-[#F2ECE2] `}
            >
              Instagram
            </p>
          </div>
          <div className="flex flex-col items-center transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            <a href="https://www.youtube.com/@LouiKng" target="_blank">
              <YouTubeIcon className="w-10  md:w-15  2xl:w-20 inline-block  transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"></YouTubeIcon>
            </a>
            <p
              className={`${inter.className} text-xl 2xl:text-3xl  flex  leading-relaxed text-center text-[#F2ECE2] `}
            >
              YouTube
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
