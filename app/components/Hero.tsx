"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Syncopate } from "next/font/google";
import Loader from "./Loader";

const VIDEO_WAIT_LIMIT_MS = 6_000;
const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["700"],
});

type HeroProps = {
  heroRef: RefObject<HTMLDivElement | null>;
};

const Hero = ({ heroRef }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoStatus, setVideoStatus] = useState<
    "loading" | "ready" | "fallback"
  >("loading");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const source = video.querySelector("source");
    const timeoutId = window.setTimeout(() => {
      setVideoStatus("fallback");
    }, VIDEO_WAIT_LIMIT_MS);

    const handleReady = () => {
      window.clearTimeout(timeoutId);
      setVideoStatus("ready");
    };
    const handleError = () => {
      window.clearTimeout(timeoutId);
      setVideoStatus("fallback");
    };

    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("error", handleError);
    source?.addEventListener("error", handleError);

    // Media can load or fail before React attaches the event listeners.
    const frameId = window.requestAnimationFrame(() => {
      if (video.error || video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        handleError();
      } else if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        handleReady();
      }
    });

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("error", handleError);
      source?.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <section
      className="relative bg-[#0F1115] bg-cover bg-[center_25%]"
      style={{ backgroundImage: "url('/images/slide3.webp')" }}
      id="hero"
      ref={heroRef}
    >
      <video
        ref={videoRef}
        className={`relative w-full h-screen pt-20 overflow-hidden object-cover object-[center_25%] transition-opacity duration-500 motion-reduce:transition-none ${videoStatus === "ready" ? "opacity-100" : "opacity-0"}`}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/slide3.webp"
        aria-hidden="true"
      >
        <source src="/videos/hero.webm" type="video/webm" />
      </video>
      <div
        className={`absolute inset-0 bg-black/25 pointer-events-none transition-opacity duration-500 motion-reduce:transition-none ${videoStatus === "ready" ? "opacity-0" : "opacity-100"}`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center translate-y-40">
        <h1
          className={` ${syncopate.className}   text-[#F2ECE2]  text-7xl  md:text-9xl  font-bold text-center z-10 drop-shadow-black`}
        >
          LOUI KANG
        </h1>
      </div>
      {videoStatus === "loading" && <Loader />}
      <noscript>
        <style>{`.hero-loader { display: none; }`}</style>
      </noscript>
      {/* FADE BOTTOM */}
      <div className="absolute bottom-0 left-0 w-full z-5 h-32 bg-linear-to-t from-[#0F1115] to-transparent pointer-events-none " />
    </section>
  );
};

export default Hero;
