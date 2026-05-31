import { describe, expect, it } from "vitest";

import { analyze } from "../src/analyze.js";
import { sampleVendorReplacement } from "../src/data/sampleVendorReplacement.js";

describe("analyze vendor replacement", () => {
  it("calculates the rollup totals", () => {
    const report = analyze(sampleVendorReplacement, { now: "2026-05-31T10:15:00Z" });
    expect(report.vendors).toBe(8);
    expect(report.annualSpendUsd).toBe(2067000);
    expect(report.modeledSavingsUsd).toBe(866000);
  });

  it("marks blocked and stale cases", () => {
    const report = analyze(sampleVendorReplacement, { now: "2026-05-31T10:15:00Z" });
    expect(report.blockedCandidates).toBe(2);
    expect(report.staleCases).toBeGreaterThanOrEqual(3);
  });

  it("produces high-severity findings for migration blockers and savings overclaims", () => {
    const report = analyze(sampleVendorReplacement, { now: "2026-05-31T10:15:00Z" });
    const codes = report.findingsList.map((finding) => finding.code);
    expect(codes).toContain("migration-blocker");
    expect(codes).toContain("savings-claim-unproven");
  });

  it("keeps the replacement score bounded", () => {
    const report = analyze(sampleVendorReplacement, { now: "2026-05-31T10:15:00Z" });
    expect(report.replacementScore).toBeGreaterThan(0);
    expect(report.replacementScore).toBeLessThanOrEqual(100);
  });

  it("flags the posture as not okay with this sample", () => {
    const report = analyze(sampleVendorReplacement, { now: "2026-05-31T10:15:00Z" });
    expect(report.ok).toBe(false);
  });
});
