"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import SpotifyIcon from "./icons/SpotifyIcon";
import YtMusicIcon from "./icons/YtMusicIcon";
import PlatformButton from "./PlatformButton";
import SectionHeading from "./SectionHeading";
import { latestRelease, releases, releaseMetadata } from "../data/releases";

// Keep the selector's existing font instance and control metrics unchanged.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "700"] });

export default function Music() {
  const [selectedId, setSelectedId] = useState(latestRelease.id);
  const [isLoading, setIsLoading] = useState(false);
  const selectedRelease = releases.find(({ id }) => id === selectedId) ?? latestRelease;

  const handleChange = (id: string) => {
    if (id === selectedId) return;
    setIsLoading(true);
    setSelectedId(id);
  };

  return (
    <section id="music" className="redesign-section bg-ink-2" aria-labelledby="music-heading" data-reveal>
      <div className="redesign-container">
        <SectionHeading number="02" title="MUSIC" id="music-heading" />
        <div className="flex flex-wrap items-center gap-[clamp(40px,5vw,80px)]">
          <div className="min-w-0 flex-[1_1_460px]">
            <div className="mb-8">
              <div
                role="group"
                aria-label="Lanzamientos musicales"
                className={`${inter.className} mt-4 mb-2 grid w-full max-w-[440px] grid-cols-3 gap-2 self-center rounded-xl border border-cream/15 bg-cream/3 p-1.5 md:gap-3 md:p-2`}
                style={{ gridTemplateColumns: `repeat(${Math.min(releases.length, 3)}, minmax(0, 1fr))` }}
              >
                {releases.map(({ id, title }) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selectedId === id}
                    onClick={() => handleChange(id)}
                    className={`flex min-h-16 min-w-0 items-center justify-center rounded-lg border px-2 py-3 text-center text-xs leading-relaxed font-bold tracking-[0.06em] uppercase outline-cream outline-offset-4 transition-colors duration-200 focus-visible:outline-2 motion-reduce:transition-none sm:px-4 sm:text-sm md:px-2 xl:px-4 2xl:text-base cursor-pointer ${
                      selectedId === id
                        ? "border-cream bg-cream text-selector-ink"
                        : "border-cream/20 bg-transparent text-cream/75 hover:border-cream/50 hover:bg-cream/8 hover:text-cream"
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs font-normal tracking-[0.14em] text-meta uppercase">
              {releaseMetadata(selectedRelease)}
            </p>
            <h3 className="mt-2.5 mb-10 font-display text-[clamp(30px,4vw,54px)] leading-[1.02] font-bold tracking-[-0.01em] uppercase">
              {selectedRelease.title}
            </h3>
            <p className="mb-3.5 text-xs font-semibold tracking-[0.2em] text-muted uppercase">Escuchalo en</p>
            <div className="platform-grid max-w-[560px]">
              <PlatformButton href={selectedRelease.spotifyUrl} icon={<SpotifyIcon className="size-7.5" />} label="Spotify" />
              <PlatformButton href={selectedRelease.ytMusicUrl} icon={<YtMusicIcon className="size-7.5" />} label="YouTube Music" />
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_420px] md:shrink-0">
            <div className="relative h-88 overflow-hidden rounded-xl bg-surface shadow-player" aria-busy={isLoading}>
              <iframe
                key={selectedRelease.id}
                title={`Spotify: ${selectedRelease.title}`}
                data-testid="embed-iframe"
                src={selectedRelease.spotifyEmbedUrl}
                onLoad={() => setIsLoading(false)}
                width="100%"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className={`spotify-embed block h-88 w-full rounded-xl ${isLoading ? "opacity-0" : "opacity-100"}`}
              />
              {isLoading && (
                <div className="spotify-loader absolute inset-0 grid place-items-center bg-surface" role="status">
                  <span className="sr-only">Cargando reproductor de Spotify…</span>
                  <span className="size-12 animate-spin rounded-full border-4 border-cream/20 border-t-cream motion-reduce:animate-none" aria-hidden="true" />
                </div>
              )}
              <noscript>
                <style>{`.spotify-embed { opacity: 1; } .spotify-loader { display: none; }`}</style>
              </noscript>
            </div>
            <p className="mt-3 text-xs text-muted">Reproductor oficial de Spotify.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
