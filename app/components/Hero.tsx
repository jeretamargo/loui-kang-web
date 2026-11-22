"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Loader from "./Loader";
import { latestRelease, releaseAnnouncement, releaseTypeLabel } from "../data/releases";

const VIDEO_WAIT_LIMIT_MS = 6_000;

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
      className="hero-section bg-ink bg-cover bg-[center_30%]"
      style={{ backgroundImage: "url('/images/slide3.webp')" }}
      id="hero"
      ref={heroRef}
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover object-[center_30%] transition-opacity duration-500 motion-reduce:transition-none ${videoStatus === "ready" ? "opacity-100" : "opacity-0"}`}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/slide3.webp"
        aria-hidden="true"
      >
        <source src="/videos/hero.webm" type="video/webm" />
      </video>
      <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-glow pointer-events-none absolute" aria-hidden="true" />
      <div className="redesign-container hero-content">
        <p className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.2em] uppercase">
          <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
          {latestRelease.type ? `Nuevo ${releaseTypeLabel[latestRelease.type]}` : "Nuevo lanzamiento"}
        </p>
        <h1 className="hero-title font-display font-bold">LOUI KANG</h1>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <p className="hero-release-copy text-cream/85">{releaseAnnouncement(latestRelease)}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#music" className="inline-flex min-h-13 items-center gap-2.5 rounded-full bg-accent px-7 text-base font-semibold text-cream transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none">
              <svg viewBox="0 0 16 16" className="size-3.5 fill-current" aria-hidden="true"><path d="M4 2.5 13 8 4 13.5Z" /></svg>
              Escuchar ahora
            </a>
            {latestRelease.videoUrl && (
              <a href={latestRelease.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-13 items-center rounded-full border border-cream/40 px-7 text-base font-medium text-cream transition-colors hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none">
                Ver videoclip
              </a>
            )}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-cream/15 pt-5 text-xs tracking-[0.18em] text-muted uppercase">
          <span>Ushuaia — Tierra del Fuego</span>
          <a href="#bio" className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream">Scroll ↓</a>
        </div>
      </div>
      {videoStatus === "loading" && <Loader />}
      <noscript>
        <style>{`.hero-loader { display: none; }`}</style>
      </noscript>
    </section>
  );
};

export default Hero;
