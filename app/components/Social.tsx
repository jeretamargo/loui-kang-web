"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import InstagramIcon from "./icons/InstagramIcon";
import YouTubeIcon from "./icons/YouTubeIcon";
import PlatformButton from "./PlatformButton";
import SectionHeading from "./SectionHeading";
import { artistLinks, socialContent } from "../data/links";

const InstagramEmbed = dynamic(
  () => import("react-social-media-embed").then((mod) => mod.InstagramEmbed),
  { ssr: false },
);

type EmbedCardProps = {
  platform: string;
  kind: string;
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

function EmbedCard({ platform, kind, href, icon, children }: EmbedCardProps) {
  return (
    <article className="min-w-0 rounded-xl border border-cream/8 bg-surface p-3">
      <div className="flex flex-wrap items-center gap-2.5 px-1.5 pt-1.5 pb-3.5">
        <span className="size-[22px] shrink-0" aria-hidden="true">{icon}</span>
        <span className="text-xs font-semibold tracking-[0.18em] uppercase">{platform}</span>
        <span className="text-[13px] text-muted">· {kind}</span>
        <a href={href} target="_blank" rel="noopener noreferrer" className="ml-auto whitespace-nowrap text-[13px] font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream" aria-label={`Abrir ${platform} en otra pestaña`}>
          Abrir ↗
        </a>
      </div>
      <div className="overflow-hidden rounded-lg">{children}</div>
    </article>
  );
}

export default function Social() {
  return (
    <section id="social" className="redesign-section" aria-labelledby="social-heading" data-reveal>
      <div className="redesign-container">
        <SectionHeading number="03" title="SOCIAL" id="social-heading" />
        <div className="flex flex-wrap items-stretch gap-6">
          <div className="flex min-w-0 flex-[2_1_520px] flex-col gap-6">
            <EmbedCard platform="YouTube" kind="Último video" href={socialContent.youtubeVideo} icon={<YouTubeIcon className="size-[22px]" />}>
              <iframe
                src={socialContent.youtubeEmbed}
                title="YouTube video player"
                className="block aspect-video h-auto w-full rounded-lg bg-ink"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </EmbedCard>
            <div className="flex flex-1 flex-wrap items-center justify-between gap-5 rounded-xl border border-cream/12 p-[clamp(20px,3vw,32px)]">
              <div className="min-w-0">
                <h3 className="font-display text-[clamp(20px,2.2vw,28px)] leading-[1.1] font-bold">SEGUÍ A LOUI KANG</h3>
                <p className="mt-2 text-[15px] text-muted-2">Lanzamientos, videos y lo que pasa en el estudio.</p>
              </div>
              <div className="platform-grid w-full">
                <PlatformButton href={artistLinks.instagram} icon={<InstagramIcon className="size-7.5" />} label="Instagram" />
                <PlatformButton href={artistLinks.youtube} icon={<YouTubeIcon className="size-7.5" />} label="YouTube" />
              </div>
            </div>
          </div>
          <div className="min-w-0 max-w-full flex-[1_1_340px] [&>article]:h-full">
            <EmbedCard platform="Instagram" kind="Último post" href={socialContent.instagramPost} icon={<InstagramIcon className="size-[22px]" />}>
              <InstagramEmbed url={socialContent.instagramPost} width="100%" linkText="Ver publicación en Instagram" />
            </EmbedCard>
          </div>
        </div>
      </div>
    </section>
  );
}
