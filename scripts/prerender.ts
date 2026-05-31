import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  boardMemo,
  payload,
  replacementLane,
  savingsNarrative,
  summary,
  switchingRisks,
  verification
} from "../src/services/vendorReplacementIntelligenceService.js";
import {
  renderBoardMemo,
  renderDocs,
  renderOverview,
  renderReplacementLane,
  renderSavingsNarrative,
  renderSwitchingRisks,
  renderVerification
} from "../src/services/render.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const site = path.join(root, "site");

rmSync(site, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("replacement-lane", "index.html")]: renderReplacementLane(),
  [path.join("switching-risks", "index.html")]: renderSwitchingRisks(),
  [path.join("savings-narrative", "index.html")]: renderSavingsNarrative(),
  [path.join("board-memo", "index.html")]: renderBoardMemo(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://replace.kineticgain.com/sitemap.xml\n",
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://replace.kineticgain.com/</loc></url>
  <url><loc>https://replace.kineticgain.com/replacement-lane/</loc></url>
  <url><loc>https://replace.kineticgain.com/switching-risks/</loc></url>
  <url><loc>https://replace.kineticgain.com/savings-narrative/</loc></url>
  <url><loc>https://replace.kineticgain.com/board-memo/</loc></url>
  <url><loc>https://replace.kineticgain.com/verification/</loc></url>
  <url><loc>https://replace.kineticgain.com/docs/</loc></url>
</urlset>`,
  [path.join("api", "dashboard", "summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "replacement-lane.json")]: JSON.stringify(replacementLane(), null, 2),
  [path.join("api", "switching-risks.json")]: JSON.stringify(switchingRisks(), null, 2),
  [path.join("api", "savings-narrative.json")]: JSON.stringify(savingsNarrative(), null, 2),
  [path.join("api", "board-memo.json")]: JSON.stringify(boardMemo(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: JSON.stringify(payload(), null, 2)
};

for (const [relativePath, contents] of Object.entries(files)) {
  const fullPath = path.join(site, relativePath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
}
