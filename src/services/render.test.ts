import { describe, expect, it } from "vitest";

import {
  renderBoardMemo,
  renderDocs,
  renderOverview,
  renderReplacementLane,
  renderSavingsNarrative,
  renderSwitchingRisks,
  renderVerification
} from "./render.js";

describe("vendor replacement renderers", () => {
  it("renders the overview hero", () => {
    expect(renderOverview()).toContain("Vendor Replacement Intelligence");
    expect(renderOverview()).toContain("replacement score");
  });

  it("renders each detail page", () => {
    expect(renderReplacementLane()).toContain("Replacement Lane");
    expect(renderSwitchingRisks()).toContain("Switching Risks");
    expect(renderSavingsNarrative()).toContain("Savings Narrative");
    expect(renderBoardMemo()).toContain("Board Memo");
    expect(renderVerification()).toContain("Verification");
    expect(renderDocs()).toContain("Public control surface");
  });

  it("keeps the standard footer trio", () => {
    expect(renderDocs()).toContain("github.com/mizcausevic-dev");
    expect(renderDocs()).toContain("linkedin.com/in/mirzacausevic");
    expect(renderDocs()).toContain("kineticgain.com");
  });
});
