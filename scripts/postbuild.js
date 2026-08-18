import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), "dist", "client");
const destDir = path.join(process.cwd(), "dist");
const buildDir = path.join(process.cwd(), "build");

console.log("Running postbuild copy of client assets...");

if (fs.existsSync(srcDir)) {
  try {
    // Copy to dist (Vite default output)
    fs.cpSync(srcDir, destDir, { recursive: true });
    console.log("Successfully copied dist/client assets to dist root.");

    // Copy to build (Create React App default output)
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }
    fs.cpSync(srcDir, buildDir, { recursive: true });
    console.log("Successfully copied dist/client assets to build root.");
  } catch (err) {
    console.error("Failed to copy assets:", err);
    process.exit(1);
  }
} else {
  console.warn("dist/client folder not found. Skipping copy.");
}
