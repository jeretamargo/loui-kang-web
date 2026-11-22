import { artistLinks } from "../data/links";

const profileLinks = [
  { label: "YouTube Music", href: artistLinks.youtubeMusic },
  { label: "Spotify", href: artistLinks.spotify },
  { label: "Instagram", href: artistLinks.instagram },
  { label: "YouTube", href: artistLinks.youtube },
];
const sectionLinks = [
  { label: "Inicio", href: "#hero" },
  { label: "Bio", href: "#bio" },
  { label: "Music", href: "#music" },
  { label: "Social", href: "#social" },
];
const linkClassName = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream hover:underline";

export default function Footer() {
  return (
    <div className="border-t border-cream/12" data-reveal>
      <div className="redesign-container pt-12 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="font-display text-xl font-bold tracking-[0.02em]">LOUI KANG</p>
            <p className="mt-2 text-sm text-muted">Ushuaia, Tierra del Fuego</p>
          </div>
          <nav aria-label="Pie de página" className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
            {sectionLinks.map(({ href, label }) => <a key={href} href={href} className={linkClassName}>{label}</a>)}
          </nav>
          <nav aria-label="Redes y plataformas" className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted">
            {profileLinks.map(({ href, label }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>{label}</a>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-cream/8 pt-5 text-[13px] text-muted">
          © 2026 Loui Kang. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
