import express from "express";

import {
  boardMemo,
  payload,
  replacementLane,
  savingsNarrative,
  summary,
  switchingRisks,
  verification
} from "./services/vendorReplacementIntelligenceService.js";
import {
  renderBoardMemo,
  renderDocs,
  renderOverview,
  renderReplacementLane,
  renderSavingsNarrative,
  renderSwitchingRisks,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/replacement-lane", (_req, res) => res.type("html").send(renderReplacementLane()));
  app.get("/switching-risks", (_req, res) => res.type("html").send(renderSwitchingRisks()));
  app.get("/savings-narrative", (_req, res) => res.type("html").send(renderSavingsNarrative()));
  app.get("/board-memo", (_req, res) => res.type("html").send(renderBoardMemo()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/replacement-lane", (_req, res) => res.json(replacementLane()));
  app.get("/api/switching-risks", (_req, res) => res.json(switchingRisks()));
  app.get("/api/savings-narrative", (_req, res) => res.json(savingsNarrative()));
  app.get("/api/board-memo", (_req, res) => res.json(boardMemo()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload()));

  return app;
}

const app = createApp();
export default app;

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT || 5570);
  app.listen(port, () => {
    console.log(`vendor-replacement-intelligence listening on http://127.0.0.1:${port}`);
  });
}
