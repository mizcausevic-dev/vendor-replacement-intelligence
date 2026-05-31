// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  boardMemo,
  payload,
  replacementLane,
  savingsNarrative,
  summary,
  switchingRisks,
  verification
} from "./vendorReplacementIntelligenceService.js";

function layout(title: string, active: string, body: string) {
  const nav = [
    { href: "/", label: "Overview" },
    { href: "/replacement-lane", label: "Replacement Lane" },
    { href: "/switching-risks", label: "Switching Risks" },
    { href: "/savings-narrative", label: "Savings Narrative" },
    { href: "/board-memo", label: "Board Memo" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root{
        --bg:#070a0f; --panel:#0b1220; --line:rgba(120,255,170,.18); --line2:rgba(120,255,170,.10);
        --text:#e9f3ff; --muted:rgba(233,243,255,.72); --muted2:rgba(233,243,255,.55);
        --good:#37ff8b; --cyan:#19c7ff; --warn:#ffcc66; --bad:#ff5c7a;
        --shadow:0 18px 60px rgba(0,0,0,.55);
        --mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        --sans:ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      }
      *{box-sizing:border-box} html,body{height:100%}
      body{
        margin:0; font-family:var(--sans); color:var(--text);
        background:
          radial-gradient(1200px 600px at 20% -10%, rgba(55,255,139,.18), transparent 60%),
          radial-gradient(900px 520px at 90% 0%, rgba(25,199,255,.16), transparent 55%),
          radial-gradient(1000px 600px at 50% 110%, rgba(55,255,139,.10), transparent 60%),
          linear-gradient(180deg, #05070c 0%, #070a0f 35%, #05070c 100%);
      }
      .wrap{max-width:1280px; margin:0 auto; padding:24px 22px 80px}
      .topbar{
        display:flex; justify-content:space-between; align-items:flex-start; gap:14px;
        border-bottom:1px solid var(--line2); padding-bottom:14px; margin-bottom:22px;
        font-family:var(--mono); font-size:11px; letter-spacing:.16em; color:var(--muted); text-transform:uppercase;
      }
      .topbar .left{color:var(--good)}
      .topbar .right{text-align:right}
      .topbar .right div{margin-bottom:4px}
      .herorow{display:grid; grid-template-columns:1.5fr .9fr; gap:18px}
      @media (max-width:1000px){.herorow{grid-template-columns:1fr}}
      .hero,.corr,.bluf{background:linear-gradient(180deg, rgba(11,18,32,.95), rgba(8,14,26,.92)); border:1px solid var(--line); box-shadow:var(--shadow)}
      .hero{border-radius:22px; padding:28px 28px 24px; border-top:2px solid var(--cyan)}
      .hero h1{font-size:56px; line-height:.98; margin:0 0 16px; font-weight:800; letter-spacing:-.5px}
      @media (max-width:700px){.hero h1{font-size:40px}}
      .hero p{color:var(--muted); font-size:15px; line-height:1.55; max-width:680px; margin:0 0 18px}
      .chiprow,.navrow,.footer-links{display:flex; flex-wrap:wrap; gap:8px}
      .meta-chip,.navchip{
        font-family:var(--mono); font-size:11px; color:var(--muted);
        padding:8px 12px; border-radius:999px; border:1px solid var(--line);
        background:rgba(6,10,18,.4); text-decoration:none;
      }
      .navchip.active{color:#071017;background:linear-gradient(135deg,var(--good),var(--cyan));font-weight:700}
      .side{display:flex; flex-direction:column; gap:14px}
      .corr,.bluf{border-radius:14px; padding:16px 18px}
      .corr{border-left:4px solid var(--good)}
      .bluf{border-left:4px solid var(--warn)}
      .corr .lbl,.bluf .lbl{font-family:var(--mono); font-size:10px; letter-spacing:.18em; text-transform:uppercase}
      .corr .lbl{color:var(--good)} .bluf .lbl{color:var(--warn)}
      .corr p,.bluf p,.ttbl td,.ttbl th{color:var(--muted); line-height:1.55}
      .section{margin-top:34px}
      .sh{display:flex; justify-content:space-between; align-items:baseline; gap:14px; padding-bottom:10px; border-bottom:1px solid var(--line2); margin-bottom:14px}
      .sh h2{margin:0; font-size:24px}
      .sh .note{font-family:var(--mono); font-size:11px; color:var(--muted2); letter-spacing:.16em; text-transform:uppercase}
      .kpis{display:grid; grid-template-columns:repeat(6,1fr); gap:12px}
      @media (max-width:1100px){.kpis{grid-template-columns:repeat(3,1fr)}} @media (max-width:640px){.kpis{grid-template-columns:repeat(2,1fr)}}
      .kpi{border:1px solid var(--line); border-radius:14px; padding:14px; background:linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65))}
      .kpi .v{font-family:var(--mono); font-size:26px; font-weight:600; color:var(--cyan)}
      .kpi .lbl{font-family:var(--mono); font-size:10px; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-top:6px}
      .kpi .h{font-size:12px; color:var(--muted); margin-top:8px}
      .stack,.board{display:grid; grid-template-columns:repeat(3,1fr); gap:14px}
      @media (max-width:1000px){.stack,.board{grid-template-columns:1fr}}
      .src,.pcard{border-radius:16px; padding:18px 20px; border:1px solid var(--line); background:linear-gradient(180deg, rgba(11,18,32,.85), rgba(8,14,26,.65))}
      .src .src-name{font-family:var(--mono); font-size:11px; color:var(--good); letter-spacing:.18em; text-transform:uppercase}
      .src .src-tit{margin:8px 0 6px; font-size:18px; font-weight:600}
      .ttbl{width:100%; border-collapse:separate; border-spacing:0; border:1px solid var(--line); border-radius:14px; overflow:hidden}
      .ttbl th,.ttbl td{padding:13px 14px; text-align:left; font-size:13.5px; vertical-align:top}
      .ttbl thead th{font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--muted2); border-bottom:1px solid var(--line); background:rgba(11,18,32,.5)}
      .st{font-family:var(--mono); font-size:10px; padding:4px 9px; border-radius:6px; letter-spacing:.1em; text-transform:uppercase; border:1px solid currentColor; display:inline-block}
      .red{color:var(--bad)} .yellow{color:var(--warn)} .green{color:var(--good)} .info{color:var(--cyan)}
      .pcard .ptop{display:flex; justify-content:space-between; align-items:center; margin-bottom:8px}
      .pcard .pnum{font-family:var(--mono); font-size:22px; font-weight:600; color:var(--good)}
      .pcard .ppri{font-family:var(--mono); font-size:10px; padding:5px 10px; border-radius:999px; border:1px solid var(--line); color:var(--good)}
      .pcard h3{margin:6px 0 8px; font-size:19px}
      .pcard .pdesc{font-size:13.5px; color:var(--muted); margin:0 0 14px}
      .pcard ul.check{list-style:none; padding:0; margin:0 0 14px}
      .pcard ul.check li{padding:6px 0; font-size:13.5px; color:var(--muted)}
      .footer{margin-top:30px; padding-top:14px; border-top:1px dashed var(--line2); display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; font-family:var(--mono); font-size:11px; color:var(--muted2)}
      a{color:inherit}
      code{font-family:var(--mono); font-size:12px; color:var(--cyan); background:rgba(25,199,255,.08); padding:1px 6px; border-radius:5px; border:1px solid rgba(25,199,255,.18)}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="topbar">
        <div class="left">Kinetic Gain · Vendor Replacement Intelligence</div>
        <div class="right">
          <div>board-ready vendor strategy intelligence · synthetic sample data only</div>
          <div>replacement candidates · switching risk · savings narrative</div>
        </div>
      </div>
      <div class="herorow">
        <section class="hero">
          <div class="chiprow">
            <span class="meta-chip">Executive intelligence core</span>
            <span class="meta-chip">Vendor replacement strategy</span>
            <span class="meta-chip">Synthetic sample data only</span>
          </div>
          <h1>Vendor-replacement intelligence that shows where savings are real, where switching risk is understated, and what belongs in the board memo.</h1>
          <p>This surface turns vendor overlap, renewal timing, hidden dependencies, migration blockers, and modeled savings into one executive view: replacement score, switching-risk map, savings narrative packets, and board-ready memo language.</p>
          <div class="navrow">
            ${nav.map((link) => `<a class="navchip${active === link.href ? " active" : ""}" href="${link.href}">${link.label}</a>`).join("")}
          </div>
        </section>
        <aside class="side">
          <div class="bluf">
            <div class="lbl">Commercial Front Door</div>
            <p><strong>Board-ready replacement and savings intelligence for CEOs, CFOs, CIOs, operators, and investors.</strong><br />One surface for deciding which vendors can be retired, which exits are still fantasy, and what savings story survives diligence.</p>
          </div>
          <div class="corr">
            <div class="lbl">Proof Layer</div>
            <p><strong>Offline analyzer plus executive control surface.</strong><br />This repo reads synthetic vendor-estate reviews and turns them into replacement score, switching-risk findings, savings narrative packets, and memo outputs.</p>
          </div>
          <div class="corr">
            <div class="lbl">Why it matters</div>
            <p>Leaders searching for <strong>vendor replacement intelligence, switching-risk analysis, board-ready savings narratives, replacement benchmarking, and diligence-safe platform simplification</strong> should see a real product, not a procurement wish list.</p>
          </div>
        </aside>
      </div>
      ${body}
      <div class="footer">
        <div>vendor-replacement-intelligence · synthetic sample data only</div>
        <div class="footer-links">
          <a class="meta-chip" href="https://github.com/mizcausevic-dev/">GitHub</a>
          <a class="meta-chip" href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
          <a class="meta-chip" href="https://kineticgain.com/">Kinetic Gain</a>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function severityClass(value: string) {
  if (value === "high" || value === "red") return "red";
  if (value === "medium" || value === "yellow") return "yellow";
  if (value === "green" || value === "low") return "green";
  return "info";
}

export function renderOverview() {
  const metrics = summary();
  return layout(
    "Vendor Replacement Intelligence",
    "/",
    `<section class="section">
        <div class="sh"><h2>Executive Snapshot</h2><div class="note">score · savings · blocked exits</div></div>
        <div class="kpis">
          <div class="kpi"><div class="v">${metrics.replacementScore}</div><div class="lbl">replacement score</div><div class="h">Rollup score for exit readiness, renewal timing, and board-safe savings posture.</div></div>
          <div class="kpi"><div class="v">${metrics.vendors}</div><div class="lbl">vendors</div><div class="h">Named vendor positions modeled inside the replacement strategy view.</div></div>
          <div class="kpi"><div class="v">${metrics.readyCandidates}</div><div class="lbl">ready exits</div><div class="h">Candidates that can support a savings story without heroic migration assumptions.</div></div>
          <div class="kpi"><div class="v">${metrics.blockedCandidates}</div><div class="lbl">blocked</div><div class="h">Candidates where hidden dependencies still outweigh the board savings story.</div></div>
          <div class="kpi"><div class="v">$${Math.round(metrics.annualSpendUsd / 1000)}k</div><div class="lbl">annual spend</div><div class="h">Modeled vendor spend currently sitting inside the replacement portfolio.</div></div>
          <div class="kpi"><div class="v">$${Math.round(metrics.modeledSavingsUsd / 1000)}k</div><div class="lbl">modeled savings</div><div class="h">Modeled value available if the cleanest exits are executed without self-inflicted drag.</div></div>
        </div>
      </section>
      <section class="section">
        <div class="sh"><h2>What leaders need</h2><div class="note">exposure · save · sequence</div></div>
        <div class="stack">
          <div class="src"><div class="src-name">where exposure sits</div><div class="src-tit">Keep blocked exits and renewal cliffs visible</div><p>${metrics.recommendation}</p></div>
          <div class="src"><div class="src-name">where to save</div><div class="src-tit">Take the low-drama overlap retirements first</div><p>Ready exits, overlap-tax removals, and staged savings now sit in one executive view instead of disconnected procurement debates.</p></div>
          <div class="src"><div class="src-name">where to invest</div><div class="src-tit">Fund dependency cleanup before promising the bigger savings</div><p>The highest-value exits still need cleaner migration proof, so the board memo has to sequence reality before ambition.</p></div>
        </div>
      </section>`
  );
}

export function renderReplacementLane() {
  return layout(
    "Vendor Replacement Intelligence — Replacement Lane",
    "/replacement-lane",
    `<section class="section">
        <div class="sh"><h2>Replacement Lane</h2><div class="note">owner · risk · next action</div></div>
        <table class="ttbl">
          <thead><tr><th>Lane</th><th>Owner</th><th>Status</th><th>Related findings</th><th>Focus</th><th>Next action</th></tr></thead>
          <tbody>
            ${replacementLane().map((lane) => `<tr><td><b>${lane.lane}</b><br />${lane.note}</td><td>${lane.owner}</td><td><span class="st ${severityClass(lane.status)}">${lane.status}</span></td><td>${lane.relatedFindings}</td><td>${lane.focus}</td><td>${lane.nextAction}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>`
  );
}

export function renderSwitchingRisks() {
  return layout(
    "Vendor Replacement Intelligence — Switching Risks",
    "/switching-risks",
    `<section class="section">
        <div class="sh"><h2>Switching Risks</h2><div class="note">severity · owner · replacement subject</div></div>
        <table class="ttbl">
          <thead><tr><th>Risk</th><th>Owner</th><th>Vendor</th><th>System</th><th>Message</th></tr></thead>
          <tbody>
            ${switchingRisks().map((finding) => `<tr><td><span class="st ${severityClass(finding.severity)}">${finding.severity}</span><br /><b>${finding.code}</b></td><td>${finding.owner}</td><td>${finding.vendor}</td><td>${finding.systemName}</td><td>${finding.message}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>`
  );
}

export function renderSavingsNarrative() {
  return layout(
    "Vendor Replacement Intelligence — Savings Narrative",
    "/savings-narrative",
    `<section class="section">
        <div class="sh"><h2>Savings Narrative</h2><div class="note">board packet · owner · window</div></div>
        <div class="board">
          ${savingsNarrative().map((packet) => `<article class="pcard">
            <div class="ptop"><div class="pnum">${packet.completenessScore}%</div><div class="ppri">${packet.owner}</div></div>
            <h3>${packet.lane}</h3>
            <p class="pdesc">${packet.decisionNote}</p>
            <ul class="check">
              <li>${packet.blocker}</li>
              <li>${packet.launchWindowHours} hours to the next executive decision checkpoint</li>
              <li>Status: <span class="st ${severityClass(packet.status)}">${packet.status}</span></li>
            </ul>
            <div><code>${packet.packetId}</code></div>
          </article>`).join("")}
        </div>
      </section>`
  );
}

export function renderBoardMemo() {
  return layout(
    "Vendor Replacement Intelligence — Board Memo",
    "/board-memo",
    `<section class="section">
        <div class="sh"><h2>Board Memo</h2><div class="note">summary · confidence · next move</div></div>
        <div class="stack">
          ${boardMemo().map((item, index) => `<div class="src"><div class="src-name">memo ${index + 1}</div><div class="src-tit">${item}</div><p>Use this language when leadership needs a savings and simplification story that can survive diligence instead of collapsing under migration detail.</p></div>`).join("")}
        </div>
      </section>`
  );
}

export function renderVerification() {
  return layout(
    "Vendor Replacement Intelligence — Verification",
    "/verification",
    `<section class="section">
        <div class="sh"><h2>Verification</h2><div class="note">board-safe claims only</div></div>
        <div class="stack">
          ${verification().map((item, index) => `<div class="src"><div class="src-name">verification ${index + 1}</div><div class="src-tit">${item}</div><p>This surface stays bounded to synthetic sample data, modeled savings, and reproducible executive scoring.</p></div>`).join("")}
        </div>
      </section>`
  );
}

export function renderDocs() {
  return layout(
    "Vendor Replacement Intelligence — Docs",
    "/docs",
    `<section class="section">
        <div class="sh"><h2>Docs</h2><div class="note">routes · cli · api</div></div>
        <div class="stack">
          <div class="src"><div class="src-name">routes</div><div class="src-tit">Public control surface</div><p><code>/</code>, <code>/replacement-lane</code>, <code>/switching-risks</code>, <code>/savings-narrative</code>, <code>/board-memo</code>, <code>/verification</code>, <code>/docs</code></p></div>
          <div class="src"><div class="src-name">api</div><div class="src-tit">Structured payloads</div><p><code>/api/dashboard/summary</code>, <code>/api/replacement-lane</code>, <code>/api/switching-risks</code>, <code>/api/savings-narrative</code>, <code>/api/board-memo</code>, <code>/api/verification</code>, <code>/api/sample</code></p></div>
          <div class="src"><div class="src-name">cli</div><div class="src-tit">Offline replacement analysis</div><p><code>npx vendor-replacement-intelligence fixtures/vendor-replacement-clean.json --format summary</code> renders the same posture the dashboard exposes.</p></div>
        </div>
      </section>`
  );
}

export function renderSample() {
  return JSON.stringify(payload(), null, 2);
}
