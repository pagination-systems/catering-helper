import { defineConfig } from "tsup";

// Inline the workspace packages instead of leaving them external: they're ESM
// built with plain tsc, whose extensionless relative imports Node's native ESM
// resolver rejects at runtime (ERR_MODULE_NOT_FOUND). Bundling them lets esbuild
// add the extensions tsc omits.
export default defineConfig({
  entry: ["src/server.ts"],
  format: "esm",
  dts: true,
  sourcemap: true,
  noExternal: [/^@catering\//],
});
