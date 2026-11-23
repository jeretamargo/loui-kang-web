import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { componentLoader } from "./load-component.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = componentLoader()(path.join(root, "app/data/releases.ts"));

function render(name, override = data) {
  const load = componentLoader({
    "../data/releases": override,
    "next/dynamic": () => () => createElement("div", { "data-embed-fixture": "instagram" }),
  });
  const Component = load(path.join(root, `app/components/${name}.tsx`)).default;
  return renderToStaticMarkup(createElement(Component, { heroRef: { current: null } }));
}

test("Hero and Music render current release data without invented type, year or videoclip", () => {
  const hero = render("Hero");
  const music = render("Music");
  assert.ok(hero.includes(data.latestRelease.title));
  assert.ok(hero.includes("Nuevo lanzamiento"));
  assert.ok(!hero.includes("Ver videoclip"));
  assert.match(music, />Lanzamiento<\/p>/);
  assert.ok(!music.includes("Escuchá "));
  assert.equal((music.match(/class="platform-button /g) ?? []).length, 2);
});

test("prepending a data-only release features it in Hero and the first selected Music button", () => {
  const fixture = {
    ...data.latestRelease,
    id: "test-release",
    title: "Release fixture",
    type: "ep",
    year: 2025,
    videoUrl: "https://example.test/video",
  };
  const override = { ...data, latestRelease: fixture, releases: [fixture, ...data.releases] };
  const hero = render("Hero", override);
  const music = render("Music", override);
  assert.ok(hero.includes("Release fixture"));
  assert.ok(hero.includes("Nuevo EP"));
  assert.ok(hero.includes(fixture.videoUrl));
  const firstButton = music.match(/<button[^>]*>[\s\S]*?<\/button>/)?.[0];
  assert.ok(firstButton.includes('aria-pressed="true"'));
  assert.ok(firstButton.includes(fixture.title));
  assert.match(music, /Lanzamiento · EP · 2025/);
  assert.match(music, /repeat\(3, minmax\(0, 1fr\)\)/);
  assert.equal((music.match(/<button /g) ?? []).length, 4);
});

test("Bio has one numbered heading and a four-thumbnail gallery without arrows or data table", () => {
  const html = render("Bio");
  assert.equal((html.match(/<h2 /g) ?? []).length, 1);
  assert.equal((html.match(/aria-label="Ver foto /g) ?? []).length, 4);
  assert.ok(html.includes('alt="Loui Kang bajo un puente, remera negra"'));
  assert.ok(html.includes("identidad sonora"));
  assert.ok(!html.includes("Fotografía siguiente"));
  assert.ok(!html.includes("<table"));
});

test("Footer renders four fixed platform links as text and keeps the hero anchor", () => {
  const html = render("Footer");
  assert.equal((html.match(/target="_blank"/g) ?? []).length, 4);
  assert.ok(html.includes('href="#hero"'));
  assert.ok(html.includes("Todos los derechos reservados."));
  assert.ok(!html.includes("<svg"));
});

test("Spotify's SSR loading state has a no-JavaScript fallback", () => {
  const html = render("Music");
  const iframe = html.match(/<iframe\b[^>]*>/)?.[0];
  const fallback = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];
  assert.ok(iframe.includes("spotify-embed"));
  assert.match(iframe, /height="352"/);
  assert.match(fallback, /\.spotify-embed\s*\{\s*opacity:\s*1/);
  assert.match(fallback, /\.spotify-loader\s*\{\s*display:\s*none/);
});

test("Hero announces the latest release after the artist heading", () => {
  const html = render("Hero");
  assert.ok(html.indexOf("</h1>") < html.indexOf("Nuevo lanzamiento"));
  assert.ok(html.includes("shadow-release-glow"));
});

test("Music DOM puts the player before its single CTA group", () => {
  const html = render("Music");
  assert.ok(html.indexOf('class="music-info') < html.indexOf('class="music-embed'));
  assert.ok(html.indexOf('class="music-embed') < html.indexOf('class="music-actions'));
  assert.equal((html.match(/class="platform-button /g) ?? []).length, 2);
});

test("Social DOM puts both embeds before its single follow/CTA group", () => {
  const html = render("Social");
  assert.ok(html.indexOf('class="social-video') < html.indexOf('class="social-instagram'));
  assert.ok(html.indexOf('class="social-instagram') < html.indexOf('class="social-follow'));
  assert.equal((html.match(/class="platform-button /g) ?? []).length, 2);
});
