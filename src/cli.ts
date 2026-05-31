import { readFileSync } from "node:fs";

import { analyze } from "./analyze.js";
import type { VendorEstateRecord } from "./types.js";

const [, , filePath = "fixtures/vendor-replacement.json", format = "--format", output = "summary"] = process.argv;
const parsed = JSON.parse(readFileSync(filePath, "utf8")) as VendorEstateRecord[];
const report = analyze(parsed);

if (format !== "--format") {
  console.error("usage: vendor-replacement-intelligence <file> --format <summary|json>");
  process.exit(1);
}

if (output === "json") {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`generatedAt: ${report.generatedAt}`);
  console.log(`vendors: ${report.vendors}`);
  console.log(`readyCandidates: ${report.readyCandidates}`);
  console.log(`blockedCandidates: ${report.blockedCandidates}`);
  console.log(`staleCases: ${report.staleCases}`);
  console.log(`replacementScore: ${report.replacementScore}`);
  console.log(`annualSpendUsd: ${report.annualSpendUsd}`);
  console.log(`modeledSavingsUsd: ${report.modeledSavingsUsd}`);
  console.log(`highFindings: ${report.findingsList.filter((finding) => finding.severity === "high").length}`);
}
