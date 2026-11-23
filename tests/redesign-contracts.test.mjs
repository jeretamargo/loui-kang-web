import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = relative => readFileSync(path.join(root, relative), "utf8");

test("Navbar matches the authorized compact header and BurguerMenu remains unchanged", () => {
  for (const [name, expected] of [
    ["Navbar", "88b49b225bfbb0708fc065200fa100b1abc77380"],
    ["BurguerMenu", "19409438f4a5711c805fb1cd13e80f6b5a603e1a"],
  ]) {
    const source = readFileSync(path.join(root, `app/components/${name}.tsx`));
    const actual = createHash("sha1").update(`blob ${source.length}\0`).update(source).digest("hex");
    assert.equal(actual, expected, name);
  }
});

test("refactored components contain no literal hex/rgb colors outside the header", () => {
  const directories = ["app/components", "app/components/icons"];
  for (const directory of directories) {
    for (const name of readdirSync(path.join(root, directory)).filter(name => name.endsWith(".tsx"))) {
      if (["Navbar.tsx", "BurguerMenu.tsx"].includes(name)) continue;
      assert.doesNotMatch(read(`${directory}/${name}`), /#[\da-fA-F]{3,8}\b|rgba?\(/, name);
    }
  }
  const cssOutsideTheme = read("app/globals.css").replace(/@theme(?: inline)?\s*\{[^}]*\}/g, "");
  assert.doesNotMatch(cssOutsideTheme, /#[\da-fA-F]{3,8}\b|rgba?\(/);
});

test("Hero and Music consume release data without local release constants or URLs", () => {
  for (const name of ["Hero", "Music"]) {
    const source = read(`app/components/${name}.tsx`);
    assert.match(source, /from "\.\.\/data\/releases"/);
    assert.doesNotMatch(source, /https?:\/\/|NEC_|NSD_|DOSTRES_|enum Items/);
  }
  assert.doesNotMatch(read("app/components/Music.tsx"), /useScreen|NEC_DESC|Escuchá /);
  assert.doesNotMatch(read("app/components/Social.tsx"), /useScreen/);
});

test("Hero retains the video fallback lifecycle without any poster color filter", () => {
  const source = read("app/components/Hero.tsx");
  assert.match(source, /VIDEO_WAIT_LIMIT_MS = 6_000/);
  assert.match(source, /poster="\/images\/slide3.webp"/);
  assert.match(source, /source\?\.addEventListener\("error"/);
  assert.match(source, /video\.readyState >= HTMLMediaElement\.HAVE_CURRENT_DATA/);
  assert.doesNotMatch(source, /grayscale|saturate|sepia|hue-rotate/);
});
