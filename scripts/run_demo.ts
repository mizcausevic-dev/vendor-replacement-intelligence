import { summary } from "../src/services/vendorReplacementIntelligenceService.js";

const metrics = summary();

console.log(`generatedAt: 2026-05-31T10:15:00Z`);
console.log(`vendors: ${metrics.vendors}`);
console.log(`readyCandidates: ${metrics.readyCandidates}`);
console.log(`blockedCandidates: ${metrics.blockedCandidates}`);
console.log(`staleCases: ${metrics.staleCases}`);
console.log(`replacementScore: ${metrics.replacementScore}`);
console.log(`annualSpendUsd: ${metrics.annualSpendUsd}`);
console.log(`modeledSavingsUsd: ${metrics.modeledSavingsUsd}`);
console.log(`highFindings: ${metrics.highFindings}`);
