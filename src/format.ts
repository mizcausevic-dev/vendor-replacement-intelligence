import type { VendorReplacementReport } from "./types.js";

export function formatSummary(report: VendorReplacementReport) {
  return [
    `generatedAt: ${report.generatedAt}`,
    `vendors: ${report.vendors}`,
    `readyCandidates: ${report.readyCandidates}`,
    `blockedCandidates: ${report.blockedCandidates}`,
    `staleCases: ${report.staleCases}`,
    `replacementScore: ${report.replacementScore}`,
    `annualSpendUsd: ${report.annualSpendUsd}`,
    `modeledSavingsUsd: ${report.modeledSavingsUsd}`
  ].join("\n");
}
