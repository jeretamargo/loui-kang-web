export type ReleaseType = "single" | "ep" | "album";

export type Release = {
  id: string;
  title: string;
  type?: ReleaseType;
  year?: number;
  releaseDate?: string;
  spotifyUrl: string;
  ytMusicUrl: string;
  spotifyEmbedUrl: string;
  videoUrl?: string;
};

// Manual newest-first order: prepend a release to feature it in Hero and Music.
// TODO: [Confirmar el orden real; se asume No estoy cuerdo como último lanzamiento.]
export const releases: [Release, ...Release[]] = [
  {
    id: "no-estoy-cuerdo",
    title: "No estoy cuerdo",
    type: "album",
    year: 2026,
    releaseDate: "2026-10-01",
    spotifyUrl:
      "https://open.spotify.com/album/5tIGtrLRUXD2jkHBH7YcqG?si=EKoMj_gYQtCS2Oexj6pMew",
    ytMusicUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_mLvUO8Zr0Q92n2FGQUouhLpiLbo1zw5X4",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/album/5tIGtrLRUXD2jkHBH7YcqG?utm_source=generator&theme=0",
  },
  {
    id: "noches-sin-dormir",
    title: "Noches sin Dormir",
    type: "ep",
    year: 2025,
    releaseDate: "2025-04-09",
    spotifyUrl:
      "https://open.spotify.com/track/5zeGIeDbMU2wDhS18xI808?si=a7d47e2fc66e475e",
    ytMusicUrl:
      "https://music.youtube.com/watch?v=kxXs35sBq6A&si=EuwNkbOy7PMJWwCd",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/track/5zeGIeDbMU2wDhS18xI808?utm_source=generator&theme=0",
  },
  {
    id: "23",
    title: "#23",
    type: "album",
    year: 2024,
    releaseDate: "2024-04-06",
    spotifyUrl:
      "https://open.spotify.com/album/5JuE8k4mppMYMCSKXxiMj3?si=NKfKi3bPQciCrtilDye9sw",
    ytMusicUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_kJbYt0TnU1Y42jxBqFpl8h8zO-3xL0mNk&si=6uPk4i2WUWE9Wa1B",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/album/5JuE8k4mppMYMCSKXxiMj3?utm_source=generator&theme=0",
  },
];

export const latestRelease = releases[0];

export const releaseTypeLabel: Record<ReleaseType, string> = {
  single: "Single",
  ep: "EP",
  album: "Álbum",
};

export function releaseAnnouncement(release: Release): string {
  return `“${release.title}” ya está disponible en todas las plataformas.`;
}

export function releaseMetadata(release: Release): string {
  return [
    "Lanzamiento",
    release.type && releaseTypeLabel[release.type],
    release.year,
  ]
    .filter((value) => value !== undefined)
    .join(" · ");
}
