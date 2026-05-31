import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "./app.js";

describe("vendor-replacement-intelligence app", () => {
  it("serves each html route", async () => {
    const htmlRoutes = ["/", "/replacement-lane", "/switching-risks", "/savings-narrative", "/board-memo", "/verification", "/docs"];
    const app = createApp();

    for (const route of htmlRoutes) {
      const response = await request(app).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toMatch(/html/);
    }
  });

  it("serves each json route", async () => {
    const apiRoutes = [
      "/api/dashboard/summary",
      "/api/replacement-lane",
      "/api/switching-risks",
      "/api/savings-narrative",
      "/api/board-memo",
      "/api/verification",
      "/api/sample"
    ];
    const app = createApp();

    for (const route of apiRoutes) {
      const response = await request(app).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toMatch(/json/);
    }
  });
});
