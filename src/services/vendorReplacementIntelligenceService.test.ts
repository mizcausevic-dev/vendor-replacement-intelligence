import { describe, expect, it } from "vitest";

import { boardMemo, replacementLane, savingsNarrative, summary, switchingRisks } from "./vendorReplacementIntelligenceService.js";

describe("vendor replacement intelligence service", () => {
  it("returns a summary with score and savings fields", () => {
    const result = summary();
    expect(result.vendors).toBe(8);
    expect(result.replacementScore).toBeGreaterThan(0);
    expect(result.modeledSavingsUsd).toBeGreaterThan(0);
  });

  it("returns four replacement lanes", () => {
    const lanes = replacementLane();
    expect(lanes).toHaveLength(4);
    expect(lanes.some((lane) => lane.status === "red")).toBe(true);
  });

  it("sorts high-severity switching risks first", () => {
    const risks = switchingRisks();
    expect(risks[0]?.severity).toBe("high");
  });

  it("returns board-ready savings packets", () => {
    const packets = savingsNarrative();
    expect(packets).toHaveLength(4);
    expect(packets[0]?.packetId).toMatch(/^VRI-/);
  });

  it("returns concise board memo lines", () => {
    const memo = boardMemo();
    expect(memo).toHaveLength(4);
  });
});
