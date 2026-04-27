"use client";

import React, { useEffect, useState } from "react";
import SpotifyIcon from "./icons/SpotifyIcon";
import YtMusicIcon from "./icons/YtMusicIcon";
import { useScreen } from "../hooks/useScreen";
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

enum Items {
  NSD = "NSD",
  NEC = "NEC",
  DOSTRES = "DOSTRES",
}

const NEC_Title: string = "No estoy cuerdo";
const NSD_Title: string = "Noches sin Dormir";
const DOSTRES_Title: string = "#23";

const NEC_DESC: string =
  "Un descenso al vacío emocional donde la caída ya contiene el inicio del renacer";
const NSD_DESC: string =
  "Noches cargadas de insomnio y ambición, donde la oscuridad potencia la mente";
const DOSTRES_DESC: string =
  "Un recorrido entre amor, exceso y dolor, sostenido por una mirada firme hacia el futuro";

const NEC_EMBEDED: string =
  "https://open.spotify.com/embed/album/5tIGtrLRUXD2jkHBH7YcqG?utm_source=generator&theme=0";

const NSD_EMBEDED: string =
  "https://open.spotify.com/embed/track/5zeGIeDbMU2wDhS18xI808?utm_source=generator&theme=0";

const DOSTRES_EMBEDED: string =
  "https://open.spotify.com/embed/album/5JuE8k4mppMYMCSKXxiMj3?utm_source=generator&theme=0";

const NEC_Link_Spotify: string =
  "https://open.spotify.com/album/5tIGtrLRUXD2jkHBH7YcqG?si=EKoMj_gYQtCS2Oexj6pMew";

const NSD_Link_Spotify: string =
  "https://open.spotify.com/track/5zeGIeDbMU2wDhS18xI808?si=a7d47e2fc66e475e";

const dostresLink_Spotify: string =
  "https://open.spotify.com/album/5JuE8k4mppMYMCSKXxiMj3?si=NKfKi3bPQciCrtilDye9sw";

const NEC_Link_YTM: string =
  "https://music.youtube.com/playlist?list=OLAK5uy_mLvUO8Zr0Q92n2FGQUouhLpiLbo1zw5X4";

const NSD_Link_YTM: string =
  "https://music.youtube.com/watch?v=kxXs35sBq6A&si=EuwNkbOy7PMJWwCd";

const dostresLink_YTM: string =
  "https://music.youtube.com/playlist?list=OLAK5uy_kJbYt0TnU1Y42jxBqFpl8h8zO-3xL0mNk&si=6uPk4i2WUWE9Wa1B";

const Music = () => {
  const [selectedItem, setSelectedItem] = useState<Items>(Items.NEC);

  const width = useScreen();

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (item: Items) => {
    setIsLoading(true);
    setSelectedItem(item);
  };
  return (
    <div className="flex flex-col  px-6 md:px-12 lg:px-40 py-1" id="music">
      <h2
        className={` ${syncopate.className} text-6xl 2xl:text-7xl flex-end   leading-relaxed place-self-end md:place-self-start text-[#F2ECE2]  `}
      >
        MUSIC
      </h2>
      <div className="flex w-full  justify-center md:justify-end gap-x-8 md:gap-x-10 md:place-self-end ">
        <button onClick={() => handleChange(Items.NEC)}>
          <h3
            className={`flex ${inter.className} scale-90  hover:scale-110 text-md 2xl:text-2xl cursor-pointer transition-all leading-relaxed  text-center  ${selectedItem != Items.NEC ? "text-gray-800 bg-gray-200  " : "text-[#0F1115] scale-120 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]  "}    p-1 rounded-md bg-gray-50 `}
          >
            NO ESTOY CUERDO
          </h3>
        </button>
        <button onClick={() => handleChange(Items.NSD)}>
          <h3
            className={` flex ${inter.className} scale-90 hover:scale-110 text-md 2xl:text-2xl cursor-pointer transition-all leading-relaxed text-center ${selectedItem != Items.NSD ? "text-gray-800  bg-gray-200 " : "text-[#0F1115] scale-120 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"}   p-1 rounded-md bg-gray-50 `}
          >
            NOCHES SIN DORMIR
          </h3>
        </button>
        <button onClick={() => handleChange(Items.DOSTRES)}>
          <h3
            className={` flex ${inter.className} scale-90 hover:scale-110 px-2 text-2xl 2xl:text-3xl cursor-pointer transition-all leading-relaxed text-center ${selectedItem != Items.DOSTRES ? "text-gray-800 bg-gray-200 " : "text-[#0F1115] scale-120 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"} px-1  rounded-md bg-gray-50 py-3 md:py-0 `}
          >
            #23
          </h3>
        </button>
      </div>
      <div className="flex flex-col md:flex-row  md:justify-between transition-opacity duration-500 animate-fade  min-h-[487.75px] md:min-h-[416px]">
        <div className="flex flex-col ">
          <p
            className={` flex  ${inter.className} md:max-w-xs   self-center text-lg md:text-2xl 2xl:text-3xl  mt-8 leading-relaxed text-center md:justify-self-start text-[#F2ECE2]  lg:mb-8`}
          >
            {`"${
              selectedItem === Items.NEC
                ? NEC_DESC
                : selectedItem === Items.NSD
                  ? NSD_DESC
                  : DOSTRES_DESC
            }" - Loui Kang`}
          </p>
          <div className="flex flex-col ">
            <p
              className={`${inter.className} text-2xl md:text-3xl 2xl:text-4xl self-center flex mt-8 leading-relaxed text-center text-[#F2ECE2] drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] `}
            >
              {`Escuchá ${
                selectedItem === Items.NEC
                  ? NEC_Title
                  : selectedItem === Items.NSD
                    ? NSD_Title
                    : DOSTRES_Title
              }`}{" "}
            </p>
            <div className="flex w-full justify-evenly mt-4 ">
              <div className="flex  flex-col  items-center transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                <a
                  href={
                    selectedItem === Items.NEC
                      ? NEC_Link_YTM
                      : selectedItem === Items.NSD
                        ? NSD_Link_YTM
                        : dostresLink_YTM
                  }
                  target="_blank"
                >
                  <YtMusicIcon className=" w-10  md:w-15 2xl:w-20 inline-block   "></YtMusicIcon>
                </a>
                <p
                  className={`${inter.className} text-xl 2xl:text-2xl flex  leading-relaxed text-center text-[#F2ECE2] `}
                >
                  YT Music
                </p>
              </div>
              <div className="flex flex-col items-center transition cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                <a
                  href={
                    selectedItem === Items.NEC
                      ? NEC_Link_Spotify
                      : selectedItem === Items.NSD
                        ? NSD_Link_Spotify
                        : dostresLink_Spotify
                  }
                  target="_blank"
                >
                  <SpotifyIcon className=" w-10 md:w-15  2xl:w-20 inline-block   "></SpotifyIcon>
                </a>
                <p
                  className={`${inter.className} text-xl 2xl:text-2xl flex  leading-relaxed text-center text-[#F2ECE2] `}
                >
                  Spotify
                </p>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center content-center">
            <div className="flex mt-5 md:mr-50 w-30 h-30 border-4 content-center border-t-[#F2ECE2] border-gray-500 rounded-full animate-spin"></div>
          </div>
        )}
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px" }}
          src={
            selectedItem === Items.NEC
              ? NEC_EMBEDED
              : selectedItem === Items.NSD
                ? NSD_EMBEDED
                : DOSTRES_EMBEDED
          }
          onLoad={() => setIsLoading(false)}
          width={`${width < 768 ? "100%" : "45%"}`}
          height="352"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className={`mt-4 lg:h-100 self-center flex ${isLoading ? "hidden" : ""} `}
        ></iframe>
      </div>
    </div>
  );
};

export default Music;
