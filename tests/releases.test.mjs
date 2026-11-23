import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

const source = await readFile(new URL("../app/data/releases.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { releases, latestRelease, releaseAnnouncement, releaseMetadata } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

test("latest release is the first item and identifiers are unique", () => {
  assert.equal(latestRelease, releases[0]);
  assert.equal(new Set(releases.map(({ id }) => id)).size, releases.length);
});

test("all original platform URLs are present and Spotify embeds retain the dark theme", () => {
  for (const release of releases) {
    assert.equal(new URL(release.spotifyEmbedUrl).searchParams.get("theme"), "0");
    assert.equal(new URL(release.spotifyUrl).host, "open.spotify.com");
    assert.equal(new URL(release.ytMusicUrl).host, "music.youtube.com");
    assert.ok(releaseAnnouncement(release).includes(release.title));
  }
});

test("missing metadata is omitted without extra separators", () => {
  assert.equal(releaseMetadata({ ...latestRelease, type: undefined, year: undefined }), "Lanzamiento");
});

test("metadata formatter supports future confirmed type and year without extra separators", () => {
  assert.equal(releaseMetadata({ ...latestRelease, type: "ep", year: 2025 }), "Lanzamiento · EP · 2025");
  assert.equal(releaseMetadata({ ...latestRelease, year: 2025 }), "Lanzamiento · 2025");
});
