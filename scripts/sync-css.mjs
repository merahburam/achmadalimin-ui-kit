// Pulls the canonical CSS from the portfolio repo and builds the publishable
// artifacts in dist/. tokens.css MUST come before design-system.css because the
// latter references --color-* primitives defined in the former.
//
// Run: npm run build
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Source of truth lives in the sibling portfolio repo.
const PORTFOLIO_CSS = resolve(root, "..", "portfolio", "assets", "css");
const TOKENS_SRC = resolve(PORTFOLIO_CSS, "tokens.css");
const DS_SRC = resolve(PORTFOLIO_CSS, "design-system.css");

const SRC_DIR = resolve(root, "src");
const DIST_DIR = resolve(root, "dist");

function read(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (e) {
    console.error(`\n✖ Could not read ${path}\n  Is the portfolio repo a sibling of this package?\n`);
    process.exit(1);
  }
}

const tokens = read(TOKENS_SRC);
const ds = read(DS_SRC);

mkdirSync(SRC_DIR, { recursive: true });
mkdirSync(DIST_DIR, { recursive: true });

// 1. Keep a vendored copy in src/ so the package is self-contained even if the
//    portfolio repo isn't present (e.g. on a fresh clone before publish).
writeFileSync(resolve(SRC_DIR, "tokens.css"), tokens);
writeFileSync(resolve(SRC_DIR, "design-system.css"), ds);

const banner =
  `/*! @achmadalimin/ui — design system styles\n` +
  ` *  https://achmadalimin.com/design-system\n` +
  ` *  Bundled: tokens.css + design-system.css (tokens first). */\n\n`;

// 2. Single bundled stylesheet (the main entry users import).
writeFileSync(
  resolve(DIST_DIR, "styles.css"),
  banner + tokens + "\n\n" + ds
);

// 3. Also ship the two files separately for users who already have their own tokens.
copyFileSync(resolve(SRC_DIR, "tokens.css"), resolve(DIST_DIR, "tokens.css"));
copyFileSync(resolve(SRC_DIR, "design-system.css"), resolve(DIST_DIR, "design-system.css"));

console.log("✔ Built dist/styles.css (tokens + design-system)");
console.log("✔ Built dist/tokens.css, dist/design-system.css");
