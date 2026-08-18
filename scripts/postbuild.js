import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), "dist", "client");
const destDir = path.join(process.cwd(), "dist");

console.log("Running postbuild copy of client assets...");

if (fs.existsSync(srcDir)) {
  try {
    // Copy all files and folders recursively from dist/client to dist
    fs.cpSync(srcDir, destDir, { recursive: true });
    console.log("Successfully copied dist/client assets to dist root.");
  } catch (err) {
    console.error("Failed to copy assets:", err);
    process.exit(1);
  }
} else {
  console.warn("dist/client folder not found. Skipping copy.");
}
