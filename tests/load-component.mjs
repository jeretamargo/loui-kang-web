import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

const require = createRequire(import.meta.url);

// Execute the real TS/TSX modules in SSR tests without Next's build-time font transform.
export function componentLoader(overrides = {}) {
  const cache = new Map();
  function load(filename) {
    if (cache.has(filename)) return cache.get(filename).exports;
    const source = readFileSync(filename, "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      fileName: filename,
    });
    const loadedModule = { exports: {} };
    cache.set(filename, loadedModule);
    const localRequire = (specifier) => {
      if (specifier in overrides) return overrides[specifier];
      if (specifier === "next/font/google") return { Inter: () => ({ className: "test-inter" }) };
      if (specifier.startsWith(".")) {
        const target = path.resolve(path.dirname(filename), specifier);
        return load(path.extname(target) ? target : `${target}${specifier.includes("data/") ? ".ts" : ".tsx"}`);
      }
      return require(specifier);
    };
    new Function("require", "module", "exports", outputText)(localRequire, loadedModule, loadedModule.exports);
    return loadedModule.exports;
  }
  return load;
}
