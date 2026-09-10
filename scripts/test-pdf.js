import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

const tempDir = path.resolve("scratch/pdf-test");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const htmlPath = path.join(tempDir, "test.html");
const pdfPath = path.join(tempDir, "test.pdf");
const edgeUserData = path.join(tempDir, "edge-profile");

fs.writeFileSync(
  htmlPath,
  `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #1e293b; }
    h1 { color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
    .card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background: #f8fafc; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>Digitechademy Curriculum</h1>
  <div class="card">
    <h2>Programmatic Advertising & Marketing</h2>
    <p>Professional curriculum brochure generated successfully via Edge headless.</p>
  </div>
</body>
</html>`
);

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

try {
  execFileSync(edgePath, [
    "--headless",
    "--disable-gpu",
    `--user-data-dir=${edgeUserData}`,
    `--print-to-pdf=${pdfPath}`,
    htmlPath,
  ]);

  const stats = fs.statSync(pdfPath);
  console.log(`SUCCESS! Generated test PDF: ${pdfPath} (${stats.size} bytes)`);
} catch (err) {
  console.error("Execution error:", err);
}
