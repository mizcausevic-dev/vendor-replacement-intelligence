import request from "supertest";

process.env.NODE_ENV = "test";
const { createApp } = await import("../src/app.js");

const app = createApp();

const htmlRoutes = ["/", "/replacement-lane", "/switching-risks", "/savings-narrative", "/board-memo", "/verification", "/docs"];
for (const route of htmlRoutes) {
  const response = await request(app).get(route);
  if (response.status !== 200) {
    throw new Error(`expected ${route} to return 200, got ${response.status}`);
  }
}

const apiRoutes = [
  "/api/dashboard/summary",
  "/api/replacement-lane",
  "/api/switching-risks",
  "/api/savings-narrative",
  "/api/board-memo",
  "/api/verification",
  "/api/sample"
];

for (const route of apiRoutes) {
  const response = await request(app).get(route);
  if (response.status !== 200) {
    throw new Error(`expected ${route} to return 200, got ${response.status}`);
  }
}

console.log("smoke_check: ok");
