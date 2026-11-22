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
  const load = componentLoader({ "../data/releases": override });
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
